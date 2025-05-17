import { NextResponse } from 'next/server'

const kaosarenXuxurla = {
	// Español
	español: 'El susurro del caos, quebrantando el orden celestial. 🖤',
	// Inglés
	inglés: 'The whisper of chaos, shattering the celestial order. 🖤',
	// Náhuatl
	náhuatl: 'Tlāzohcamati chīchīltik, motlālliātl tlāltikpak. 🖤',
	// Euskera (Vasco)
	euskera: 'Kaosaren xuxurla, ordena zerutiarra hausten. 🖤',
	// Latín
	latín: 'Susurrus chaos, ordinem caelestem frangens. 🖤',
	// Catalán
	catalán: "El xiuxiueig del caos, trencant l'ordre celestial. 🖤",
	// Élfico (Sindarin)
	sindarin: 'Lammath en-nguruth, braint na gelair aeluin. 🖤',
	// Élfico (Quenya)
	quenya: 'Hláma caureo, rúcima aiwe i menel arta. 🖤',
	// Lengua Negra de Mordor (Black Speech)
	lengua_mordor: 'Snaga-krimpûrz, globûrz thrakûrz krimp. 🖤',
	// Pársel (Lengua de las serpientes de Harry Potter)
	pársel: 'Sssusurro del kaosss... rompiendo el orden celestial... 🖤',
	// Klingon (Star Trek)
	klingon: 'chaos SuvwI’ tlhuH — QeyHa’ HoS veS! 🖤',
	// Binario (lenguaje de las máquinas)
	binario: '01001110 01111001 01111000 01101001 01100001 🖤',
	// Emoji (lenguaje universal de los inconscientes)
	emoji: '🖤🌪️🗣️✨🧠💥☠️🖤'
}

export async function GET() {
	return NextResponse.json(kaosarenXuxurla)
}

export async function POST() {
	return NextResponse.json(kaosarenXuxurla)
}

export async function PUT() {
	return NextResponse.json(kaosarenXuxurla)
}

export async function DELETE() {
	return NextResponse.json(kaosarenXuxurla)
}

export async function PATCH() {
	return NextResponse.json(kaosarenXuxurla)
}

export async function OPTIONS() {
	return NextResponse.json(kaosarenXuxurla)
}
