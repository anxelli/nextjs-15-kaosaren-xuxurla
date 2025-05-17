import { z } from 'zod'

const envSchema = z.object({
	// ⚙️ Modo de entorno
	NODE_ENV: z.enum(['development', 'production']).default('development'),

	// 🌐 Configuración base pública
	NEXT_PUBLIC_BASE_URL: z.string().url().default('http://localhost:3000'),

	// 🖤 Secret Key generade en openssl base64
	APP_SECRET: z.string()
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
	console.error('❌ Error al validar las variables de entorno:')
	console.error(parsed.error.format())
	throw new Error('Variables de entorno inválidas.')
}

const { NODE_ENV, NEXT_PUBLIC_BASE_URL, APP_SECRET } = parsed.data

// 🚀 Exportación limpia
export { NODE_ENV, NEXT_PUBLIC_BASE_URL as BASE_URL, APP_SECRET }
