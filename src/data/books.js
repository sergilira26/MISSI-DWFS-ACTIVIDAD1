// Catálogo de prueba (sin back-end). Más adelante se sustituiría por datos reales del servidor.

const TONES = ['amber', 'violet', 'sky', 'emerald', 'rose', 'slate']

const AUTHORS = [
  'Clara M. Lobo',
  'Marcos R. Vidal',
  'Nerea Salas',
  'Diego Aranda',
  'Sofía Paredes',
  'Héctor Linares',
  'Irene Valcárcel',
  'Óscar Castaño',
  'Laura H. Peña',
  'Paula G. Rojas',
  'Sergio N. Carmona',
  'Marina S. Aguilar',
]

const DESCRIPTIONS = [
  'Relatos cortos con un punto costumbrista y un final redondo.',
  'Una historia ligera y atmosférica, de las que entran solas.',
  'Misterio amable: pistas pequeñas y un giro bien medido.',
  'Una novela breve para leer sin prisa, con buen ritmo.',
  'Lectura cómoda y con humor; perfecta para desconectar.',
  'Personajes cotidianos y detalles que hacen de pegamento.',
  'Un libro para subrayar frases y volver a ellas más tarde.',
  'Capítulos cortos, escenas claras y un cierre que acompaña.',
  'Una historia de barrio: librerías, cafés y conversaciones.',
  'Una idea sencilla, bien llevada, que deja ganas de más.',
]

const EXTRA_TITLES = [
  'Cartas entre páginas',
  'El mapa de las librerías pequeñas',
  'Café, tinta y madrugada',
  'La ciudad escrita a lápiz',
  'Una esquina para leer despacio',
  'El rumor de los marcapáginas',
  'Inventario de días tranquilos',
  'El pasillo de las novedades',
  'Manual para subrayar sin culpa',
  'La teoría del libro prestado',
  'Un cuaderno con tapas gastadas',
  'El lector que doblaba las hojas',
  'La noche del capítulo perdido',
  'El mercado de historias usadas',
  'Los nombres en el lomo',
  'La ventana de la biblioteca',
  'El secreto de la ficha 23',
  'Páginas con olor a lluvia',
  'El banco de la plaza y un poema',
  'La tinta se queda',
  'El índice de los domingos',
  'Cartografía del silencio',
  'La estantería de arriba',
  'Retratos en letra pequeña',
  'El hilo rojo del marcador',
  'Una librería abierta de noche',
  'Conversaciones en la sección B',
  'El libro que volvió solo',
  'La caja de cartas dobladas',
  'Notas al margen del verano',
  'El club de los lectores lentos',
  'Un relato para cada estación',
  'El catálogo de cosas improbables',
  'La última página no estaba',
  'El corrector de historias',
  'La colección de primeras frases',
  'El escritor de etiquetas',
  'Un ruido en la balda de arriba',
  'La ruta de los poemas cortos',
  'Ensayo sobre una cafetería vacía',
  'El manual del librero distraído',
  'La luz de una lámpara de lectura',
  'El arte de recomendar libros',
  'La mesa de novedades y el resto',
  'El día que se acabó el papel',
]

function coverUrl(id) {
  return `https://picsum.photos/seed/rdp-${id}/800/500`
}

function priceFor(idNumber) {
  const value = 11 + ((idNumber * 37) % 130) / 10
  return Number(value.toFixed(2))
}

function isbnFor(idNumber) {
  const part = String(idNumber).padStart(3, '0')
  const check = (idNumber * 7) % 10
  return `978-84-0000-${part}-${check}`
}

const BASE_BOOKS = [
  {
    id: '1',
    title: 'Relatos de papel',
    author: 'Clara M. Lobo',
    isbn: '978-84-0000-001-1',
    price: 16.9,
    tone: 'amber',
    description:
      'Una colección de cuentos breves para leer con calma. Personajes cotidianos, giros suaves y un cierre que deja buen sabor.',
  },
  {
    id: '2',
    title: 'Sombras en la estantería',
    author: 'Marcos R. Vidal',
    isbn: '978-84-0000-002-8',
    price: 19.5,
    tone: 'violet',
    description:
      'Un misterio ligero ambientado en una librería de barrio. Notas manuscritas, libros prestados y una pista en cada capítulo.',
  },
  {
    id: '3',
    title: 'La tinta y el mar',
    author: 'Nerea Salas',
    isbn: '978-84-0000-003-5',
    price: 14.75,
    tone: 'sky',
    description:
      'Una novela corta de viajes y cartas perdidas. Ideal si te apetece algo evocador y fácil de devorar en un par de tardes.',
  },
  {
    id: '4',
    title: 'Manual de historias mínimas',
    author: 'Diego Aranda',
    isbn: '978-84-0000-004-2',
    price: 12.9,
    tone: 'emerald',
    description:
      'Microcuentos y ejercicios creativos para jugar con la escritura. Perfecto si te gusta leer y también escribir un poco.',
  },
  {
    id: '5',
    title: 'El club del margen doblado',
    author: 'Sofía Paredes',
    isbn: '978-84-0000-005-9',
    price: 21.0,
    tone: 'rose',
    description:
      'Cinco lectores, un libro al mes y demasiadas opiniones. Una comedia amable sobre obsesiones literarias y amistades raras.',
  },
  {
    id: '6',
    title: 'Notas al pie de un invierno',
    author: 'Héctor Linares',
    isbn: '978-84-0000-006-6',
    price: 18.25,
    tone: 'slate',
    description:
      'Relato intimista con humor seco. Una ciudad fría, una cafetería y conversaciones que cambian sin avisar.',
  },
  {
    id: '7',
    title: 'La biblioteca de las segundas oportunidades',
    author: 'Irene Valcárcel',
    isbn: '978-84-0000-007-3',
    price: 17.8,
    tone: 'amber',
    description:
      'Historias cruzadas alrededor de un sistema de intercambio de libros. A ratos emotivo, a ratos muy cotidiano.',
  },
  {
    id: '8',
    title: 'El índice de lo perdido',
    author: 'Óscar Castaño',
    isbn: '978-84-0000-008-0',
    price: 23.4,
    tone: 'violet',
    description:
      'Thriller suave con ritmo. Un archivista encuentra un índice sin libro… y decide averiguar de dónde sale.',
  },
  {
    id: '9',
    title: 'Capítulos para una tarde de lluvia',
    author: 'Laura H. Peña',
    isbn: '978-84-0000-009-7',
    price: 15.6,
    tone: 'sky',
    description:
      'Historias cortas, atmosféricas y con un punto nostálgico. De las que te dejan con ganas de subrayar frases.',
  },
]

const EXTRA_BOOKS = EXTRA_TITLES.map((title, idx) => {
  const idNumber = 10 + idx

  return {
    id: String(idNumber),
    title,
    author: AUTHORS[idNumber % AUTHORS.length],
    isbn: isbnFor(idNumber),
    price: priceFor(idNumber),
    tone: TONES[idNumber % TONES.length],
    description: DESCRIPTIONS[idNumber % DESCRIPTIONS.length],
  }
})

export const BOOKS = [...BASE_BOOKS, ...EXTRA_BOOKS].map((book) => ({
  ...book,
  cover: coverUrl(book.id),
}))

export function getBookById(bookId) {
  return BOOKS.find((book) => book.id === String(bookId)) ?? null
}

