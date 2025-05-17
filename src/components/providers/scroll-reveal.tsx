'use client'

import { useEffect } from 'react'

export const ScrollRevealProvider = () => {
	useEffect(() => {
		if (typeof window === 'undefined') return

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						entry.target.classList.add('reveal-visible')
						observer.unobserve(entry.target)
					}
				})
			},
			{
				threshold: 0.2,
				rootMargin: '0px 0px -10% 0px'
			}
		)

		const observeScrollElements = () => {
			document
				.querySelectorAll(
					'[data-scroll]:not(.reveal-visible):not([data-observed])'
				)
				.forEach(el => {
					el.setAttribute('data-observed', 'true')
					observer.observe(el)
				})
		}

		// MutationObserver para detectar nuevos elementos con data-scroll
		const mutationObserver = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				mutation.addedNodes.forEach(node => {
					if (
						node instanceof HTMLElement &&
						node.matches(
							'[data-scroll]:not(.reveal-visible):not([data-observed])'
						)
					) {
						node.setAttribute('data-observed', 'true')
						observer.observe(node)
					} else if (node instanceof HTMLElement) {
						node.querySelectorAll?.(
							'[data-scroll]:not(.reveal-visible):not([data-observed])'
						).forEach(el => {
							el.setAttribute('data-observed', 'true')
							observer.observe(el)
						})
					}
				})
			})
		})

		observeScrollElements()
		mutationObserver.observe(document.body, {
			childList: true,
			subtree: true
		})

		return () => {
			observer.disconnect()
			mutationObserver.disconnect()
		}
	}, [])

	return null
}
