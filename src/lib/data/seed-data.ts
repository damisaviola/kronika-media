export interface SeedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

export interface SeedCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface SeedArticle {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  coverImageCaption: string;
  status: "DRAFT" | "PUBLISHED";
  isHeadline: boolean;
  isBreaking: boolean;
  isOpinion: boolean;
  viewsCount: number;
  readingTime: number;
  tags: string[];
  publishedAt: string;
  authorId: string;
  categoryId: string;
}

export const SEED_USERS: SeedUser[] = [
  {
    id: "usr-1",
    name: "Tim Media",
    email: "redaksi@kronika.id",
    role: "Redaksi KRONIKA",
    bio: "Kolektif redaksi dan kurator pop culture KRONIKA. Mengulas musik, film, gaming, anime, dan tren terkini dari Timika hingga seluruh dunia.",
    avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80",
  },
];

export const SEED_CATEGORIES: SeedCategory[] = [
  {
    id: "cat-1",
    name: "Film & Series",
    slug: "film-series",
    description: "Kabar film bioskop, serial streaming, box office Hollywood, hingga ulasan karya sineas berbakat dunia.",
  },
  {
    id: "cat-2",
    name: "Gaming & Esports",
    slug: "gaming",
    description: "Berita game konsol, PC, esports, update rilisan terbesar, dan geliat komunitas gamer dari Timika hingga global.",
  },
  {
    id: "cat-3",
    name: "Musik & Skena",
    slug: "musik",
    description: "Ledakan hip-hop Papua, kabar album baru, festival musik dunia, hingga percakapan industri rekaman.",
  },
  {
    id: "cat-4",
    name: "Anime & Pop Culture",
    slug: "anime-manga",
    description: "Anime musiman terpanas, manga populer, adaptasi live-action, cosplay, dan kultur pop Jepang.",
  },
  {
    id: "cat-5",
    name: "Streetwear & Hype",
    slug: "streetwear-hype",
    description: "Fesyen jalanan anak muda Timika, sneaker drops dunia, gadget kekinian, dan tren media sosial yang lagi viral.",
  },
];

export const SEED_ARTICLES: SeedArticle[] = [
  {
    id: "art-1",
    title: "Dari Timika Mengguncang Dunia: Gelombang Baru Hip-Hop Papua yang Menolak Redup",
    subtitle: "Rapper dan produser muda asal Timika dan Jayapura memadukan ketukan trap modern dengan instrumen tifa tradisional, mencuri perhatian kurator musik global.",
    slug: "dari-timika-mengguncang-dunia-gelombang-baru-hip-hop-papua",
    excerpt: "Bukan rahasia lagi bahwa tanah Papua adalah episentrum rima dan irama. Dari studio-studio rekaman rumahan di sudut kota Timika, lahir karya-karya hip-hop bertenaga tinggi yang kini menembus algoritma streaming internasional.",
    content: `Jalanan kota Timika di malam hari menyimpan dentum bass yang tak pernah benar-benar sunyi. Di antara deretan kafe anak muda di Jalan Cenderawasih hingga studio-studio rumahan di SP 2 dan Kuala Kencana, generasi baru musisi hip-hop Papua tengah merajut identitas musikal yang amat segar.

Mereka tidak lagi sekadar meniru beat booming 808 khas Atlanta atau grime London. Rapper-rapper muda Timika dengan lihai menyisipkan sampling perkusi tifa, senandung vokal bertutur bahasa ibu, dan lirik-lirik tajam yang merefleksikan kegelisahan, cinta, serta kebanggaan akan tanah tempat mereka berpijak.

### Menembus Batas Geografis Lewat Internet

Di era platform digital saat ini, jarak 3.000 kilometer dari ibu kota Jakarta bukan lagi halangan. Lagu-lagu independen karya kolektif musisi Timika berhasil masuk ke dalam playlist editorial bergengsi di Spotify dan Apple Music, bahkan kerap menjadi latar suara video kreator mancanegara di TikTok.

> "Kami membuat musik dari apa yang kami lihat di jalanan Timika: debu, tawa kawan-kawan, dan harapan besar. Dunia menyukai kejujuran itu."

Kolaborasi lintas pulau pun kian marak. Produser musik luar negeri mulai melirik vokal khas Papua yang memiliki timbre soulful alami dan penjiwaan rima yang mengalir organik.

### Membangun Ekosistem Mandiri

Kekuatan utama skena musik Timika terletak pada solidaritas komunitasnya. Tanpa menunggu label rekaman besar, mereka mendesain sampul album sendiri, memproduksi video musik dengan kamera digital kompak, dan menggelar festival jalanan berkala.

Gelombang ini membuktikan bahwa pop culture tidak lagi berpusat di kota-kota megapolitan dunia. Dari Timika, Papua Tengah, sebuah suara baru telah lahir dan dunia kini siap mendengarkannya.`,
    coverImageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=85",
    coverImageCaption: "Sesi rekaman musik kreatif yang merefleksikan kebebasan berekspresi generasi muda urban.",
    status: "PUBLISHED",
    isHeadline: true,
    isBreaking: true,
    isOpinion: false,
    viewsCount: 48900,
    readingTime: 4,
    tags: ["Timika", "Hip-Hop", "Musik Papua", "Pop Culture", "Kultur Lokal"],
    publishedAt: "2026-11-17T10:00:00.000Z",
    authorId: "usr-1",
    categoryId: "cat-3",
  },
  {
    id: "art-2",
    title: "Mengapa GTA 6 Jadi Game Paling Dinanti Sepanjang Sejarah Industri Hiburan?",
    subtitle: "Trailer perdana Rockstar memecahkan rekor dunia dan mengubah ekspektasi visual gaming open-world dekade ini.",
    slug: "mengapa-gta-6-jadi-game-paling-dinanti-sepanjang-sejarah",
    excerpt: "Bukan sekadar video game biasa, Grand Theft Auto VI adalah fenomena pop culture global yang mempengaruhi musik, mode jalanan, hingga ekonomi industri hiburan digital.",
    content: `Lebih dari satu dekade setelah perilisan Grand Theft Auto V, Rockstar Games bersiap menggebrak dunia dengan sekuel yang diprediksi mencetak rekor penjualan terbesar dalam sejarah hiburan modern. Dunia fiksi Leonida—versi parodi Miami dan Florida kontemporer—menjadi arena bermain baru bagi duo protagonis Lucia dan Jason.

Antusiasme publik terhadap GTA 6 telah melampaui batas komunitas gamer tradisional. Cuplikan trailer perdananya langsung menembus lebih dari 90 juta penayangan dalam 24 jam pertama, membuktikan betapa masifnya pengaruh waralaba ini terhadap kultur populer global.

### Lompatan Visual dan Realisme Generasi Baru

Bocoran dan detail resmi yang beredar menunjukkan peningkatan drastis dalam simulasi kepadatan dunia. Pantai Vice City dipadati ratusan NPC dengan perilaku unik, ekosistem satwa liar di rawa-rawa Everglades fiktif, hingga integrasi media sosial in-game bergaya TikTok dan Instagram Reels yang merefleksikan keabsurdan era internet saat ini.

Rockstar tampaknya tidak hanya membuat game, melainkan menyajikan cermin satir paling tajam terhadap gaya hidup, obsesi viral, dan budaya selebritas zaman sekarang.

> "GTA bukan lagi sekadar game open-world; ia adalah potret zaman yang menangkap denyut budaya internet kontemporer dengan sangat akurat."

### Dampak Masif Terhadap Ekosistem Gaming

Peluncuran GTA 6 juga diprediksi menjadi pendorong utama lonjakan penjualan konsol PlayStation 5 dan Xbox Series X. Sejumlah penerbit game lain bahkan dikabarkan mengatur ulang jadwal rilis mereka agar tidak bertabrakan dengan raksasa dari Rockstar ini.`,
    coverImageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=85",
    coverImageCaption: "Ilustrasi lanskap perkotaan modern neon yang merefleksikan atmosfer Vice City di era baru.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: true,
    isOpinion: false,
    viewsCount: 42150,
    readingTime: 4,
    tags: ["GTA 6", "Gaming", "Rockstar Games", "PlayStation 5", "Pop Culture"],
    publishedAt: "2026-11-17T08:00:00.000Z",
    authorId: "usr-1",
    categoryId: "cat-2",
  },
  {
    id: "art-3",
    title: "Noken Bertemu Streetwear: Saat Fesyen Tradisional Papua Berpadu dengan Kultur Sneakerhead",
    subtitle: "Kreator muda di Timika mengolah anyaman serat kayu tradisional menjadi tas selempang taktis dan aksesori urban yang diburu pencinta fesyen internasional.",
    slug: "noken-bertemu-streetwear-fesyen-tradisional-papua-dan-sneakerhead",
    excerpt: "Noken bukan lagi sekadar warisan budaya masa lalu. Di tangan anak muda Timika, tas anyaman khas Papua ini bertransformasi menjadi statement piece fesyen jalanan dunia.",
    content: `Bila Anda melintasi arena tongkrongan kreatif di Timika hari ini, ada pemandangan menarik yang jamak ditemui: perpaduan antara sepatu sneakers edisi terbatas seperti Air Jordan atau Salomon dengan tas noken rajutan serat anggrek atau kulit kayu mahkota dewa.

Perpaduan ini bukanlah kebetulan semata, melainkan evolusi sadar dari para desainer muda Timika yang menolak mengotak-ngotakkan tradisi ke dalam ruang museum semata.

### Inovasi Desain Taktis dan Fungsional

Noken modern kini diproduksi dengan tali webbing nilon gaya militer, ritsleting kedap air, serta kompartemen khusus laptop dan gadget. Kendati demikian, filosofi utama noken—yakni kekuatan, fleksibilitas, dan daya tampung elastisnya—tetap dipertahankan secara utuh.

Sejumlah streetwear enthusiast dari Jakarta, Tokyo, hingga Melbourne mulai memesan karya kustom buatan para perajin Timika melalui Instagram, mengagumi keaslian material ramah lingkungan yang tidak ditemukan di produk pabrikan massal.`,
    coverImageUrl: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Detail tekstur pakaian dan aksesori fesyen jalanan kontemporer.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: false,
    isOpinion: false,
    viewsCount: 34200,
    readingTime: 3,
    tags: ["Timika", "Streetwear", "Noken", "Fesyen", "Hypebeast"],
    publishedAt: "2026-11-16T16:00:00.000Z",
    authorId: "usr-1",
    categoryId: "cat-5",
  },
  {
    id: "art-4",
    title: "Dune Messiah Resmi Masuk Pra-Produksi: Apa yang Bisa Diharapkan Penggemar?",
    subtitle: "Denis Villeneuve kembali mengarahkan babak pamungkas perjalanan Paul Atreides di Arrakis dengan skala sinematik yang lebih intim.",
    slug: "dune-messiah-resmi-masuk-pra-produksi-apa-yang-bisa-diharapkan",
    excerpt: "Menyusul kesuksesan box office Dune: Part Two, Warner Bros dan Legendary bergerak cepat mengunci Villeneuve untuk mengadaptasi novel kedua Frank Herbert.",
    content: `Kesuksesan luar biasa Dune: Part Two di tangga box office global memastikan bab ketiga perjalanan sci-fi epik ini akan segera terwujud. Denis Villeneuve telah mengonfirmasi bahwa naskah Dune: Messiah sedang digarap dan siap membawa penonton ke sudut yang jauh lebih gelap dari mitologi Arrakis.

Jika dua film pertama fokus pada perjuangan bertahan hidup dan pemberontakan kaum Fremen, Dune: Messiah akan mengupas konsekuensi mengerikan dari perang suci yang dikobarkan Paul Atreides di seantero galaksi.

Timothée Chalamet dan Zendaya dipastikan kembali sebagai Paul dan Chani, namun dinamika hubungan mereka akan menghadapi ujian paling berat. Bagi para penikmat sinema sci-fi berkualitas tinggi, film ini menjadi salah satu proyek paling dinantikan dalam beberapa tahun mendatang.`,
    coverImageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Bentang padang pasir sinematik yang menjadi ikon dunia Arrakis karya Frank Herbert.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: false,
    isOpinion: false,
    viewsCount: 31200,
    readingTime: 3,
    tags: ["Dune", "Film", "Denis Villeneuve", "Sci-Fi", "Hollywood"],
    publishedAt: "2026-11-16T14:30:00.000Z",
    authorId: "usr-1",
    categoryId: "cat-1",
  },
  {
    id: "art-5",
    title: "Skena Esports Timika: Dari Turnamen Warkop hingga Panggung Juara Nasional",
    subtitle: "Anak-anak muda Timika membuktikan bahwa keterbatasan ping dan infrastruktur tak menyurutkan bakat mereka bersaing di Mobile Legends dan Valorant.",
    slug: "skena-esports-timika-turnamen-warkop-hingga-juara-nasional",
    excerpt: "Komunitas gaming di Timika kian bergeliat dengan turnamen mingguan yang ramai diikuti ratusan tim lokal berdaya juang tinggi.",
    content: `Warung kopi dan kafe berjejaring fiber optik di penjuru Timika kini ramai oleh sorak-sorai anak muda yang sedang berkompetisi dalam turnamen Mobile Legends, PUBG Mobile, dan Valorant.

Bakat mekanik para pemain Papua dikenal sangat agresif dan tak terduga. Beberapa talenta muda asal Timika bahkan sudah mulai dilirik oleh akademi tim esports tier-1 di Jakarta untuk berlaga di panggung MDL dan MPL. Komunitas esports lokal pun aktif menggelar pembinaan talenta agar gamer muda tidak sekadar bermain untuk hobi, melainkan menjadikannya jalur karier profesional.`,
    coverImageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Suasana kompetisi gaming dan antusiasme komunitas esports modern.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: true,
    isOpinion: false,
    viewsCount: 27500,
    readingTime: 3,
    tags: ["Timika", "Gaming", "Esports", "Mobile Legends", "Papua"],
    publishedAt: "2026-11-16T10:00:00.000Z",
    authorId: "usr-1",
    categoryId: "cat-2",
  },
  {
    id: "art-6",
    title: "Demon Slayer: Infinity Castle Dibuat Trilogi Film Bioskop Layar Lebar",
    subtitle: "Ufotable memilih format trilogi sinematik beranggaran raksasa untuk mengadaptasi arc pertempuran puncak melawan Muzan Kibutsuji.",
    slug: "demon-slayer-infinity-castle-trilogi-film-bioskop",
    excerpt: "Keputusan menghadirkan arc pamungkas Kimetsu no Yaiba ke bioskop diprediksi bakal kembali memecahkan rekor box office animasi dunia.",
    content: `Kabar bahagia sekaligus mendebarkan datang bagi jutaan penggemar anime Kimetsu no Yaiba (Demon Slayer). Studio Ufotable dan Aniplex secara resmi mengumumkan bahwa arc legendaris Infinity Castle tidak akan ditayangkan sebagai serial televisi biasa, melainkan diadaptasi menjadi trilogi film bioskop berlayar lebar.

Langkah ini menyusul rekor fenomenal Mugen Train yang hingga kini masih memegang rekor film Jepang terlaris sepanjang masa. Pertarungan para Hashira di dimensi ruang tak berujung Ufotable diyakini akan tampil maksimal dalam tata suara dan layar bioskop format IMAX.`,
    coverImageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Visual bergaya anime modern yang merefleksikan antusiasme tontonan animasi Jepang.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: false,
    isOpinion: false,
    viewsCount: 38400,
    readingTime: 3,
    tags: ["Anime", "Demon Slayer", "Ufotable", "Manga", "Bioskop"],
    publishedAt: "2026-11-15T18:00:00.000Z",
    authorId: "usr-1",
    categoryId: "cat-4",
  },
  {
    id: "art-7",
    title: "Nintendo Switch 2: Segala Bocoran Fitur, Backward Compatibility, dan Jadwal Rilis",
    subtitle: "Konsol penerus Switch kabarnya mengusung layar 8 inci, chip kustom Nvidia dengan DLSS, dan dukungan penuh pustaka game sebelumnya.",
    slug: "nintendo-switch-2-bocoran-fitur-dan-jadwal-rilis",
    excerpt: "Setelah mendominasi pasar konsol portabel selama delapan tahun, Nintendo akhirnya bersiap memperkenalkan suksesor mesin hybrid legendaris mereka.",
    content: `Dengan penjualan Switch generasi pertama yang telah melampaui 140 juta unit di seluruh dunia, tantangan terbesar Nintendo adalah menciptakan penerus yang tidak memecah belah basis pemain setia mereka.

Kabar baik yang paling ditunggu gamer adalah fitur backward compatibility: game fisik maupun digital Switch generasi pertama dipastikan dapat dimainkan langsung di Switch 2 dengan peningkatan performa dan resolusi yang lebih stabil. Dukungan AI upscaling Nvidia DLSS juga memungkinkan performa grafis setara konsol rumahan modern dalam genggaman portabel.`,
    coverImageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Konsol genggam gaming portabel modern yang menjadi inspirasi evolusi gaming hybrid.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: false,
    isOpinion: false,
    viewsCount: 35100,
    readingTime: 3,
    tags: ["Nintendo", "Switch 2", "Gaming", "Konsol", "Teknologi"],
    publishedAt: "2026-11-14T16:00:00.000Z",
    authorId: "usr-1",
    categoryId: "cat-2",
  },
  {
    id: "art-8",
    title: "Era Kamera Retro Digital: Mengapa Kamera Saku Jadul Mendadak Viral di Medsos?",
    subtitle: "Generasi muda meninggalkan kamera smartphone 200MP demi estetika grainy dan flash keras kamera saku digital era 2000-an.",
    slug: "era-kamera-retro-digital-mengapa-kamera-saku-jadul-viral",
    excerpt: "Harga kamera digital CCD bekas melambung di marketplace setelah viral di TikTok. Pengguna bosan dengan foto smartphone yang terlalu bersih dan hasil olahan komputasi AI.",
    content: `Jika Anda masih menyimpan kamera saku digital merek Canon IXUS, Sony Cybershot, atau Nikon Coolpix rilisan tahun 2005 di laci rumah, kini saatnya membersihkan debunya.

Tren ini berakar dari rasa jenuh generasi muda terhadap kamera smartphone modern yang memproses foto secara berlebihan. Kamera saku sensor CCD lawas menghasilkan foto dengan karakter unik: warna agak hangat, flash keras di malam hari, dan tekstur grain yang autentik tanpa perlu filter aplikasi tambahan.`,
    coverImageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Kamera kompak digital lawas yang kini kembali menjadi buruan fotografer kasual dan pencinta gaya Y2K.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: false,
    isOpinion: false,
    viewsCount: 26700,
    readingTime: 3,
    tags: ["Kamera", "Retro", "Y2K", "TikTok", "Gadget"],
    publishedAt: "2026-11-14T11:20:00.000Z",
    authorId: "usr-1",
    categoryId: "cat-5",
  },
];
