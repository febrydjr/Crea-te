const articlesData = [
  {
    id: 1,
    thumbnail: "https://picsum.photos/1366/768",
    category: "Sports",
    title: "Indonesia Juara Piala Dunia 2022, Cuti Bersama 3 Hari",
    author: "Febry Dharmawan Jr",
    date: "2023-4-20",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel felis bibendum, bibendum. Vivamus ut luctus nulla, id tincidunt nisl. Duis in ante vel elit viverra bibendum. Maecenas aliquet, velit id fringilla ultrices, dui sapien sollicitudin velit, vel pulvinar mi velit eu sapien.",
  },
  {
    id: 2,
    thumbnail: "https://picsum.photos/1366/767",
    category: "Technology",
    title: "React Itu Mudah Sekali, Semua Orang Pasti Bisa (Mungkin)",
    author: "Andre D Java",
    date: "2023-3-20",
    videos: "https://www.youtube.com/embed/6Lzv5XKl6H8",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel felis bibendum, bibendum. Vivamus ut luctus nulla, id tincidunt nisl. Duis in ante vel elit viverra bibendum. Maecenas aliquet, velit id fringilla ultrices, dui sapien sollicitudin velit, vel pulvinar mi velit eu sapien.",
    keywords: "React, Purwadhika, Belajar, JavaScript",
  },
  {
    id: 3,
    thumbnail: "https://picsum.photos/1366/766",
    category: "Health",
    title: "Covid-19 Hilang, Satu Pack Masker Seharga Permen",
    author: "Kokoh Jason",
    date: "2029-11-20",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel felis bibendum, at pretium urna bibendum. Vivamus ut luctus nulla, id tincidunt nisl. Duis in ante vel elit viverra bibendum. Maecenas aliquet, velit id fringilla ultrices, dui sapien sollicitudin velit, vel pulvinar mi velit eu sapien.",
  },
  {
    id: 4,
    thumbnail: "https://picsum.photos/1366/765",
    category: "Business",
    title: "Tingkat Inflasi Indonesia Tahun 2023 Sangat Tinggi",
    author: "Najwa Shihab",
    date: "2003-10-22",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel felis bibendum, at pretium urna bibendum. Vivamus ut luctus nulla, id tincidunt nisl. Duis in ante vel elit viverra bibendum. Maecenas aliquet, velit id fringilla ultrices, dui sapien sollicitudin velit, vel pulvinar mi velit eu sapien.",
    keywords: "Business",
  },
  {
    id: 5,
    thumbnail: "https://picsum.photos/1366/764",
    category: "Politics",
    title: "All In Prabowo Presiden, Untuk Indonesia Lebih Baik",
    author: "Najwa Shihab",
    date: "2020-7-11",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel felis bibendum, at pretium urna bibendum. Vivamus ut luctus nulla, id tincidunt nisl. Duis in ante vel elit viverra bibendum. Maecenas aliquet, velit id fringilla ultrices, dui sapien sollicitudin velit, vel pulvinar mi velit eu sapien.",
  },
  {
    id: 6,
    thumbnail: "https://picsum.photos/1366/763",
    category: "Entertainment",
    title: "Film Terbaru Dari Hollywood Mendapat Sambutan Positif",
    author: "John Doe",
    date: "2023-2-10",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel felis bibendum, at pretium urna bibendum. Vivamus ut luctus nulla, id tincidunt nisl. Duis in ante vel elit viverra bibendum. Maecenas aliquet, velit id fringilla ultrices, dui sapien sollicitudin velit, vel pulvinar mi velit eu sapien.",
  },
  {
    id: 7,
    thumbnail: "https://picsum.photos/1366/762",
    category: "Travel",
    title: "Liburan Seru di Pantai Bali, Destinasi Favorit Wisatawan",
    author: "Jane Smith",
    date: "2023-8-5",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel felis bibendum, at pretium urna bibendum. Vivamus ut luctus nulla, id tincidunt nisl. Duis in ante vel elit viverra bibendum. Maecenas aliquet, velit id fringilla ultrices, dui sapien sollicitudin velit, vel pulvinar mi velit eu sapien.",
  },
  {
    id: 8,
    thumbnail: "https://picsum.photos/1366/761",
    category: "Sports",
    title: "Tim Sepak Bola Indonesia Menang Telak di Kejuaraan Asia",
    author: "David Williams",
    date: "2023-6-1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel felis bibendum, at pretium urna bibendum. Vivamus ut luctus nulla, id tincidunt nisl. Duis in ante vel elit viverra bibendum. Maecenas aliquet, velit id fringilla ultrices, dui sapien sollicitudin velit, vel pulvinar mi velit eu sapien.",
  },
  {
    id: 9,
    thumbnail: "https://picsum.photos/1366/760",
    category: "Technology",
    title: "Inovasi Terbaru: Robot Pembersih Rumah Dengan Kecerdasan Buatan",
    author: "Emily Johnson",
    date: "2023-5-15",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel felis bibendum, at pretium urna bibendum. Vivamus ut luctus nulla, id tincidunt nisl. Duis in ante vel elit viverra bibendum. Maecenas aliquet, velit id fringilla ultrices, dui sapien sollicitudin velit, vel pulvinar mi velit eu sapien.",
    keywords: "Robot, Kecerdasan Buatan, Inovasi, Rumah",
  },
  {
    id: 10,
    thumbnail: "https://picsum.photos/1366/759",
    category: "Health",
    title: "10 Makanan Sehat yang Harus Dikonsumsi Setiap Hari",
    author: "Michael Brown",
    date: "2023-7-25",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel felis bibendum, at pretium urna bibendum. Vivamus ut luctus nulla, id tincidunt nisl. Duis in ante vel elit viverra bibendum. Maecenas aliquet, velit id fringilla ultrices, dui sapien sollicitudin velit, vel pulvinar mi velit eu sapien.",
    keywords: "Makanan Sehat, Gizi, Kesehatan",
  },
  {
    id: 11,
    thumbnail: "https://picsum.photos/1366/758",
    category: "Business",
    title: "Startup Teknologi Baru Muncul Dengan Pendanaan Besar",
    author: "Jessica Lee",
    date: "2023-9-12",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel felis bibendum, at pretium urna bibendum. Vivamus ut luctus nulla, id tincidunt nisl. Duis in ante vel elit viverra bibendum. Maecenas aliquet, velit id fringilla ultrices, dui sapien sollicitudin velit, vel pulvinar mi velit eu sapien.",
  },
  {
    id: 12,
    thumbnail: "https://picsum.photos/1366/757",
    category: "Politics",
    title: "Calon Presiden Baru Bersiap Hadapi Pemilihan Umum",
    author: "John Doe",
    date: "2023-10-30",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel felis bibendum, at pretium urna bibendum. Vivamus ut luctus nulla, id tincidunt nisl. Duis in ante vel elit viverra bibendum. Maecenas aliquet, velit id fringilla ultrices, dui sapien sollicitudin velit, vel pulvinar mi velit eu sapien.",
  },
  {
    id: 13,
    thumbnail: "https://picsum.photos/1366/756",
    category: "Entertainment",
    title: "Musik Populer Bergema di Panggung Musik Terbesar Dunia",
    author: "Emily Davis",
    date: "2023-11-18",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel felis bibendum, at pretium urna bibendum. Vivamus ut luctus nulla, id tincidunt nisl. Duis in ante vel elit viverra bibendum. Maecenas aliquet, velit id fringilla ultrices, dui sapien sollicitudin velit, vel pulvinar mi velit eu sapien.",
  },
  {
    id: 14,
    thumbnail: "https://picsum.photos/1366/755",
    category: "Sports",
    title: "Tim Sepak Bola Nasional Melaju ke Final Piala Dunia",
    author: "David Williams",
    date: "2023-12-03",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel felis bibendum, at pretium urna bibendum. Vivamus ut luctus nulla, id tincidunt nisl. Duis in ante vel elit viverra bibendum. Maecenas aliquet, velit id fringilla ultrices, dui sapien sollicitudin velit, vel pulvinar mi velit eu sapien.",
  },
  {
    id: 15,
    thumbnail: "https://picsum.photos/1366/754",
    category: "Technology",
    title: "Perkembangan Teknologi Baru dalam Industri Otomotif",
    author: "Jessica Lee",
    date: "2024-01-15",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vel felis bibendum, at pretium urna bibendum. Vivamus ut luctus nulla, id tincidunt nisl. Duis in ante vel elit viverra bibendum. Maecenas aliquet, velit id fringilla ultrices, dui sapien sollicitudin velit, vel pulvinar mi velit eu sapien.",
    keywords: "Teknologi, Otomotif, Inovasi",
  },
];

export default articlesData;
