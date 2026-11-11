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
    name: "Taufik Hidayatullah",
    email: "taufik@kronika.id",
    role: "EDITOR_IN_CHIEF",
    bio: "Jurnalis investigasi senior dengan fokus tata kelola sumber daya alam, energi, dan akuntabilitas publik.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "usr-2",
    name: "Sekar Paramitha",
    email: "sekar@kronika.id",
    role: "SENIOR_REPORTER",
    bio: "Spesialis makroekonomi, rantai pasok global, dan kebijakan moneter Asia Tenggara.",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "usr-3",
    name: "Baskara Mahendra",
    email: "baskara@kronika.id",
    role: "TECH_CORRESPONDENT",
    bio: "Meliput persimpangan semikonduktor, komputasi otonom, dan kedaulatan data regional.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "usr-4",
    name: "Anindya Wardhani",
    email: "anindya@kronika.id",
    role: "COLUMNIST",
    bio: "Pengamat kebudayaan urban, antropologi digital, dan sejarah arsitektur pascakolonial.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
  },
];

export const SEED_CATEGORIES: SeedCategory[] = [
  {
    id: "cat-1",
    name: "Nasional",
    slug: "nasional",
    description: "Pelaporan investigasi, kebijakan publik, dan dinamika institusi tata kelola di seluruh penjuru kepulauan.",
  },
  {
    id: "cat-2",
    name: "Ekonomi & Pasar",
    slug: "ekonomi-pasar",
    description: "Analisis tajam arus modal, stabilitas moneter, dinamika komoditas, dan industri riil.",
  },
  {
    id: "cat-3",
    name: "Sains & Teknologi",
    slug: "sains-teknologi",
    description: "Eksplorasi infrastruktur komputasi, terobosan sains material, dan kedaulatan rekayasa modern.",
  },
  {
    id: "cat-4",
    name: "Geopolitik",
    slug: "geopolitik",
    description: "Arus pergeseran kekuatan Pasifik, perimbangan diplomasi pertahanan, dan arsitektur perdagangan bebas.",
  },
  {
    id: "cat-5",
    name: "Esai & Budaya",
    slug: "esai-budaya",
    description: "Kritik estetika, telaah sosiologis, arsip ingatan sejarah, dan percakapan sastra intelektual.",
  },
];

export const SEED_ARTICLES: SeedArticle[] = [
  {
    id: "art-1",
    title: "Anatomi Krisis Mineral Kritis: Di Balik Tirai Hilirisasi Nikel dan Realitas Daya Tawar Karbon Global",
    subtitle: "Investigasi mendalam menelusuri rantai pasok peleburan pirometalurgi, defisit neraca energi fosil di pulau-pulau industri, dan kalkulasi ulang pajak karbon Eropa.",
    slug: "anatomi-krisis-mineral-kritis-hilirisasi-nikel-dan-karbon-global",
    excerpt: "Di balik narasi gemilang lonjakan ekspor komoditas olahan, bentang alam pesisir timur Indonesia menghadapi paradoks: ekspansi turbin uap captive bertubrukan langsung dengan regulasi rantai pasok baterai global.",
    content: `Kawasan industri peleburan di pesisir Sulawesi Tengah tampak tak pernah lelap. Cerobong-cerobong pembangkit listrik tenaga uap (PLTU) kawasan terus memuntahkan uap tebal ke langit malam Teluk Tolo, memasok daya tanpa jeda untuk ratusan tanur putar listrik (RKEF) yang melelehkan bijih nikel laterit berkadar tinggi.

Namun, di ruang-ruang perundingan korporasi multinasional di Brussels dan Jenewa, lanskap ini dibaca dengan metriks yang amat berbeda. Penerapan mekanisme penyesuaian batas karbon (CBAM) oleh Uni Eropa tidak lagi memandang nikel sekadar dari kemurnian kimianya, melainkan menghitung setiap gram emisi setara karbon yang melekat sejak proses pengupasan tanah pucuk hingga pelat katoda siap kirim.

### Titik Tolak Paradoks Daya

Dalam satu dekade terakhir, transformasi ekonomi berbasis hilirisasi mineral mineral nikel sukses melonjakkan nilai perdagangan luar negeri hingga berlipat ganda. Berdasarkan dokumen audit independen yang ditinjau Kronika, volume nikel olahan bentuk Ferronickel dan Nickel Pig Iron (NPI) melompat signifikan. Kendati demikian, 88 persen konsumsi energi fasilitas pemurnian masih ditopang oleh batu bara berkalori rendah yang dibakar di lokasi privat.

"Kita sedang menghadapi jurang asimetris antara kecepatan pembangunan pabrik pemurnian dengan peta jalan dekarbonisasi jaringan listrik nasional," ungkap Dr. Suryo Handoko, peneliti senior transisi energi. "Ketika pembeli di belahan bumi utara mewajibkan transparansi jejak karbon tingkat satu hingga tiga, nikel yang diproduksi dengan intensitas emisi tinggi terancam terlempar dari rantai pasok kendaraan listrik premium."

Dampak regulasi ini sudah mulai terasa. Beberapa konsorsium otomotif transnasional menahan penandatanganan kontrak pasokan jangka panjang, menuntut renegosiasi harga berbasis sertifikasi hijau yang ketat. Tanpa integrasi energi terbarukan—baik hidro maupun geotermal skala besar—marjin keuntungan produsen domestik diprediksi tergerus beban tarif penalti karbon internasional dalam kurun lima tahun ke depan.

### Rekonfigurasi Tata Ruang dan Keadilan Ekologis

Di luar kalkulasi makroekonomi, tekanan paling nyata dirasakan oleh komunitas pesisir tangkap tradisional. Sedimentasi lumpur laterit pada musim penghujan mengubah bentang padang lamun menjadi perairan keruh, memaksa perahu nelayan melaut lebih jauh hingga 15 mil laut guna mencari tangkapan ikan pelagis.

Pemerintah pusat melalui kementerian teknis mengklaim telah menyiapkan regulasi ambang batas baru bagi izin pembuangan limbah terkelola dan reklamasi terintegrasi. Namun penegakan hukum di lapangan sering kali tersandung keterbatasan inspektur tambang terakreditasi serta tumpang tindih yurisdiksi perizinan daerah dan kawasan ekonomi khusus.

Pertanyaan krusial kini bergeser dari sekadar 'berapa banyak bijih yang dapat diolah', melainkan 'bagaimana memastikan kedaulatan industri tidak mengorbankan daya dukung ekologis generasi mendatang'.`,
    coverImageUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=85",
    coverImageCaption: "Instalasi dermaga kargo mineral dan tanur industri di pesisir timur Indonesia. Foto: Arsip Investigasi Kronika / Adityo Nugroho.",
    status: "PUBLISHED",
    isHeadline: true,
    isBreaking: false,
    isOpinion: false,
    viewsCount: 28450,
    readingTime: 6,
    tags: ["Investigasi", "Hilirisasi", "Transisi Energi", "Tata Kelola"],
    publishedAt: "2026-11-11T09:15:00.000Z",
    authorId: "usr-1",
    categoryId: "cat-1",
  },
  {
    id: "art-2",
    title: "Bank Sentral Menahan Suku Bunga Acuan di Tengah Turbulensi Yield Obligasi Global",
    subtitle: "Rapat Dewan Gubernur mempertahankan BI-Rate di level 6,00 persen demi menjaga jangkar stabilitas nilai tukar rupiah dan membentengi arus modal portofolio.",
    slug: "bank-sentral-menahan-suku-bunga-acuan-turbulensi-obligasi-global",
    excerpt: "Keputusan moneter terbaru mencerminkan kehati-hatian otoritas dalam membaca sinyal inflasi impor serta ketidakpastian jalur pelonggaran moneter Federal Reserve.",
    content: `Otoritas moneter kembali mengambil posisi bertahan. Dalam konferensi pers penutupan Rapat Dewan Gubernur (RDG) bulanan, Gubernur Bank Indonesia menegaskan komitmen mempertahankan suku bunga acuan pada angka 6,00 persen, sejalan dengan konsensus para ekonom pasar modal.

Kebijakan ini didesain untuk memastikan ekspektasi inflasi tetap terjangkar dalam sasaran 2,5±1 persen hingga akhir tahun kalender, sembari meredam volatilitas nilai tukar rupiah yang dipicu lonjakan yield surat utang pemerintah Amerika Serikat (US Treasury 10-year).

### Dinamika Likuiditas Domestik

Instrumen Sekuritas Rupiah Bank Indonesia (SRBI) dan Sekuritas Valas Bank Indonesia (SVBI) tetap difungsikan sebagai penyerap likuiditas pro-market. Otoritas mencatat aliran masuk modal asing secara neto mulai kembali ke instrumen moneter tersebut, kendati pasar saham masih mencatatkan aksi jual bersih selektif oleh manajer investasi regional.

Sektor perbankan nasional menyikapi langkah ini dengan tetap menjaga rasio kecukupan modal (CAR) di atas ambang aman 26 persen. Namun, pertumbuhan kredit investasi mulai menunjukkan perlambatan tipis seiring sikap korporasi yang memilih wait-and-see menjelang penataan belanja modal kuartal pertama tahun depan.`,
    coverImageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Layar pergerakan bursa efek dan terminal perdagangan obligasi di Jakarta Pusat. Foto: Kronika / Bayu Santoso.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: true,
    isOpinion: false,
    viewsCount: 19820,
    readingTime: 4,
    tags: ["Moneter", "Perbankan", "Pasar Modal", "Rupiah"],
    publishedAt: "2026-11-11T07:45:00.000Z",
    authorId: "usr-2",
    categoryId: "cat-2",
  },
  {
    id: "art-3",
    title: "Arsitektur Kedaulatan Semikonduktor: Ambisi Fabrikasi Kemasan Lanjutan di Koridor Selat Malaka",
    subtitle: "Ketika konsorsium riset nasional dan mitra transnasional mulai menguji fasilitas back-end packaging chip mikro arsitektur 7nm.",
    slug: "arsitektur-kedaulatan-semikonduktor-fabrikasi-kemasan-lanjutan",
    excerpt: "Bukan bersaing membangun pabrik fabrikasi wafer silikon bernilai ratusan triliun, melainkan mengunci ceruk strategis pengujian dan perakitan substrat komputasi kuantum.",
    content: `Perang dagang semikonduktor dunia membuka celah baru bagi negara-negara non-blok di Asia Tenggara. Fasilitas Advanced Packaging Center yang didirikan di koridor industri kepulauan Batam menandai langkah konkret pergeseran rantai pasok mikrokontroler presisi tinggi.

Kemasan lanjutan (advanced packaging) dan heterogenous integration kini memegang peranan krusial setara dengan proses fotolitografi ultraviolet ekstrem. Dengan memadukan chiplet fabrikasi berbeda di atas satu interposer silikon, efisiensi energi komputasi kecerdasan buatan dapat ditingkatkan tanpa harus bergantung pada fasilitas fab generasi termutakhir.

### Kolaborasi Multidisipliner

Pusat riset ini melibatkan rekayasawan dari tiga perguruan tinggi teknik terkemuka bersama aliansi produsen peralatan uji presisi. Fokus riset mencakup manajemen termal substrat tembaga mikro dan pengujian keandalan interkoneksi balok solder mikroskopis.

Langkah ini diproyeksikan membuka ribuan lapangan kerja teknis bersertifikasi tinggi serta memperkuat posisi tawar kawasan dalam diplomasi teknologi global.`,
    coverImageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Pemeriksaan wafer semikonduktor menggunakan mikroskop interferometri laser. Foto: Unsplash / Laura Ockel.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: false,
    isOpinion: false,
    viewsCount: 15400,
    readingTime: 5,
    tags: ["Teknologi", "Semikonduktor", "Inovasi", "Riset"],
    publishedAt: "2026-11-11T06:20:00.000Z",
    authorId: "usr-3",
    categoryId: "cat-3",
  },
  {
    id: "art-4",
    title: "Reorganisasi Pakta Pertahanan Indo-Pasifik Pasca-KTT Maritim Pasifik Selatan",
    subtitle: "Peta diplomasi kawasan mengalami pergeseran halus ketika negara-negara kepulauan menolak hegemoni biner demi kedaulatan zona ekonomi maritim.",
    slug: "reorganisasi-pakta-pertahanan-indo-pasifik-pasca-ktt-maritim",
    excerpt: "Deklarasi bersama Port Moresby mempertegas posisi tawar negara-negara kepulauan dalam mengawasi batas perairan dan kabel telekomunikasi bawah laut.",
    content: `Konstelasi keamanan regional Pasifik Selatan memasuki babak baru pasca-penutupan KTT Maritim multilateral. Para delegasi menegaskan penolakan terhadap paksaan memilih poros militer tunggal, sembari memperkuat patroli gabungan perlindungan kabel data serat optik bawah laut yang menghubungkan benua Asia dan Amerika.

Diplomasi jalan tengah yang konsisten disuarakan Jakarta kembali mendapatkan momentum. Alih-alih menyepakati pembangunan pangkalan pertahanan permanen, forum menyepakati mekanisme pertukaran citra radar satelit aperture sintetis (SAR) secara real-time guna menumpas penangkapan ikan ilegal dan penyelundupan lintas batas.

Pengamat hubungan internasional mencatat bahwa kedaulatan data kelautan kini menjadi mata uang geopolitik paling berharga di abad ke-21.`,
    coverImageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Kapal patroli navigasi maritim berlayar melintasi selat strategis di perairan timur. Foto: Kronika / Reuters.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: false,
    isOpinion: false,
    viewsCount: 11200,
    readingTime: 5,
    tags: ["Geopolitik", "Maritim", "Pertahanan", "Diplomasi"],
    publishedAt: "2026-11-11T04:10:00.000Z",
    authorId: "usr-1",
    categoryId: "cat-4",
  },
  {
    id: "art-5",
    title: "Kota Tanpa Trotoar: Politik Spasial Ruang Publik dan Pudarnya Hak Pejalan Kaki",
    subtitle: "Esai reflektif mengenai relasi kuasa di balik perancangan jalan arteri metropolitan yang mengorbankan ruang perjumpaan warga demi pemujaan laju kendaraan bermotor.",
    slug: "kota-tanpa-trotoar-politik-spasial-ruang-publik",
    excerpt: "Trotoar bukan sekadar semen cor di pinggir aspal, melainkan manifestasi paling mendasar dari kontrak sosial kewargaan dan kesetaraan hak ruang hidup.",
    content: `Di bawah terik matahari siang kota metropolis, jarak dua ratus meter terasa seperti ekspedisi bertahan hidup. Pejalan kaki dipaksa bermanuver di celah sempit antara knalpot sepeda motor yang melintas trotoar pecah dan deretan pagar seng proyek jalan layang yang tak kunjung rampung.

Ketiadaan trotoar yang layak adalah keputusan politik yang disengaja, bukan sekadar kelalaian teknis tata ruang. Ketika anggaran infrastruktur triliunan rupiah digelontorkan untuk melebarkan jalan tol dalam kota, ruang pejalan kaki direduksi menjadi sisa-sisa tanah tak bertuan.

### Hak Atas Kota

Filsuf sosiologi perkotaan David Harvey pernah menggarisbawahi bahwa 'hak atas kota' bukan sekadar kebebasan individu mengakses sumber daya perkotaan, melainkan hak untuk mengubah diri kita dengan cara mengubah kota. Ketika warga tidak lagi dapat berjalan kaki dengan aman dan bermartabat, percakapan spontan antar-kelas di trotoar sirna, digantikan oleh isolasi kabin berpenyejuk udara.

Membangun kembali trotoar adalah tindakan pemulihan martabat kewargaan. Kota yang adil diukur dari bagaimana ia memperlakukan warganya yang paling rentan: anak-anak, lansia, dan kaum difabel yang melangkah di atas aspal tanpa pelindung baja.`,
    coverImageUrl: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Persimpangan koridor jalan utama ibu kota saat senja. Foto: Unsplash / Aleksandr Popov.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: false,
    isOpinion: true,
    viewsCount: 32100,
    readingTime: 7,
    tags: ["Esai", "Urbanisme", "Sosiologi", "Ruang Publik"],
    publishedAt: "2026-11-10T16:00:00.000Z",
    authorId: "usr-4",
    categoryId: "cat-5",
  },
  {
    id: "art-6",
    title: "Mengurai Jejak Keuangan Gelap di Balik Izin Konsesi Hutan Adat",
    subtitle: "Investigasi mengungkap jaringan perusahaan cangkang di yurisdiksi suaka pajak yang menampung aliran dana pelepasan kawasan lindung tanpa persetujuan warga lokal.",
    slug: "mengurai-jejak-keuangan-gelap-konsesi-hutan-adat",
    excerpt: "Analisis ribuan lembar dokumen pendaftaran korporasi dan transaksi antar-bank memperlihatkan modus pengalihan kepemilikan saham sebelum izin diterbitkan.",
    content: `Sebuah desa adat di pedalaman pegunungan Meratus terbangun oleh deru buldoser yang merobohkan tegakan pohon ulin berusia ratusan tahun. Di atas kertas, konsesi perkebunan monokultur seluas 14 ribu hektare telah disetujui melalui serangkaian keputusan administratif yang tampak rapi.

Namun penelusuran mendalam terhadap akta notaris perusahaan pemegang konsesi membuka tabir berlapis. Perusahaan terafiliasi dengan entitas cangkang yang terdaftar di pulau suaka pajak Karibia, dengan jalur pembiayaan yang berputar melalui beberapa nominee perorangan tanpa rekam jejak agribisnis.

Koalisi masyarakat sipil kini mengajukan gugatan tata usaha negara sekaligus menuntut pembekuan aset perusak lingkungan hidup berbasis undang-undang pencegahan tindak pidana pencucian uang.`,
    coverImageUrl: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Kanopi hutan hujan tropis di kawasan pegunungan pedalaman. Foto: Unsplash / Arnaud Mesureur.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: false,
    isOpinion: false,
    viewsCount: 22150,
    readingTime: 6,
    tags: ["Investigasi", "Lingkungan", "Hukum", "Keuangan"],
    publishedAt: "2026-11-10T11:20:00.000Z",
    authorId: "usr-1",
    categoryId: "cat-1",
  },
  {
    id: "art-7",
    title: "Revolusi Senyap Jaringan Listrik Cerdas Berbasis Baterai Natrium",
    subtitle: "Uji coba penyimpanan energi skala gigawatt-hour pertama di gardu transmisi Jawa Bagian Barat membuktikan alternatif baterai non-litium untuk stabilitas beban puncak.",
    slug: "revolusi-senyap-jaringan-listrik-cerdas-baterai-natrium",
    excerpt: "Dengan memanfaatkan kelimpahan garam natrium domestik, biaya modal sistem penyimpanan energi stasioner (BESS) berhasil dipangkas hingga 35 persen.",
    content: `Perdebatan mengenai intermitensi pembangkit energi surya dan angin menemukan jawaban teknis yang menjanjikan. Konsorsium rekayasa kelistrikan nasional meresmikan unit percontohan Battery Energy Storage System (BESS) berbasis katoda natrium-ion di Purwakarta.

Berbeda dengan kendaraan listrik yang menuntut densitas energi tinggi dari litium dan kobalt, baterai penyimpanan stasioner untuk jaringan listrik mengutamakan keamanan termal, ketahanan siklus hidup panjang, dan ketersediaan bahan baku lokal.

Teknologi ini terbukti mampu menginjeksi daya dalam hitungan milidetik saat terjadi penurunan frekuensi mendadak pada jaringan transmisi 500 kV, mencegah risiko pemadaman meluas (blackout) saat cuaca ekstrem.`,
    coverImageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Instalasi gardu induk transmisi tegangan ekstra tinggi. Foto: Unsplash / Matthew Henry.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: false,
    isOpinion: false,
    viewsCount: 16700,
    readingTime: 4,
    tags: ["Sains", "Energi Bersih", "Listrik", "Teknologi"],
    publishedAt: "2026-11-10T08:00:00.000Z",
    authorId: "usr-3",
    categoryId: "cat-3",
  },
  {
    id: "art-8",
    title: "Masa Depan Pangan di Tengah Penciutan Lahan Basah Jawa Timur",
    subtitle: "Konversi lahan sawah produktif menjadi kawasan logistik dan pergudangan mengancam target surplus beras nasional dalam kurun lima tahun ke depan.",
    slug: "masa-depan-pangan-penciutan-lahan-basah-jawa-timur",
    excerpt: "Di delta Sungai Brantas, irigasi teknis warisan kolonial yang subur terpotong oleh pembangunan simpul logistik, memicu penurunan luas panen hingga 12 persen.",
    content: `Data citra satelit resolusi tinggi yang dikompilasi kelompok riset agronomi independen menunjukkan penurunan luas baku sawah beririgasi teknis di sepanjang koridor pantura timur. Tanah kelas satu dengan indeks pertanaman tiga kali setahun terdesak oleh ekspansi kompleks pergudangan ekspor-impor.

Meskipun undang-undang perlindungan lahan pertanian pangan berkelanjutan (LP2B) telah diterbitkan belasan tahun silam, kompensasi ganti rugi pembebasan lahan yang menggiurkan bagi petani pemilik usia lanjut membuat alih fungsi lahan sulit dibendung.

Para ahli menyerukan insentif pajak tanah progresif bagi kawasan lumbung pangan serta revitalisasi serikat tani muda guna mencegah ketergantungan struktural pada beras impor.`,
    coverImageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Petani merawat pematang sawah di kawasan agraris Jawa Timur. Foto: Kronika / Dian Pratama.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: false,
    isOpinion: false,
    viewsCount: 18900,
    readingTime: 5,
    tags: ["Agraria", "Pangan", "Ekonomi", "Nasional"],
    publishedAt: "2026-11-09T14:30:00.000Z",
    authorId: "usr-2",
    categoryId: "cat-2",
  },
  {
    id: "art-9",
    title: "Merawat Bahasa Ibu di Tengah Dominasi Algoritma Konten Singkat",
    subtitle: "Catatan kebudayaan tentang ancaman punahnya kosakata lokal nusantara akibat penyeragaman gaya tutur media sosial berbasis kecerdasan buatan.",
    slug: "merawat-bahasa-ibu-dominasi-algoritma-konten-singkat",
    excerpt: "Ketika kecerdasan buatan dilatih utamanya dengan korpus bahasa dominan, dialek dan nuansa semantik ratusan bahasa daerah terancam terpinggirkan dari memori digital peradaban.",
    content: `Bahasa bukan sekadar alat komunikasi fungsional; ia adalah cara suatu peradaban mengonseptualisasikan waktu, relasi kekerabatan, dan hubungan dengan kosmos. Ketika generasi muda menghabiskan rata-rata enam jam sehari menyerap konten video berdurasi 15 detik yang diterjemahkan secara otomatis oleh model bahasa raksasa, terjadi erosi kosakata rasa dan kiasan khas daerah.

Program digitalisasi korpus sastra lisan di pelosok pulau Flores dan Halmahera memperlihatkan betapa mendesaknya perekaman fonetik asli sebelum penutur fasih terakhir tiada.

Penyelamatan bahasa daerah tidak cukup dengan ritual pidato kebudayaan tahunan, melainkan memerlukan integrasi kurikulum lokal yang hidup serta penciptaan ruang ekspresi kontemporer bagi kreator muda daerah.`,
    coverImageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Deretan manuskrip sastra klasik di perpustakaan naskah kuno. Foto: Unsplash / Patrick Tomasso.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: false,
    isOpinion: true,
    viewsCount: 24300,
    readingTime: 5,
    tags: ["Budaya", "Bahasa", "Esai", "Literatur"],
    publishedAt: "2026-11-09T09:00:00.000Z",
    authorId: "usr-4",
    categoryId: "cat-5",
  },
  {
    id: "art-10",
    title: "Navigasi Kepentingan di Selat Hormuz dan Resonansi ke Harga BBM Domestik",
    subtitle: "Ketegangan baru di rute lalu lintas tanker minyak bumi dunia membunyikan alarm bagi postur subsidi energi dalam APBN semester berikutnya.",
    slug: "navigasi-kepentingan-selat-hormuz-resonansi-harga-bbm",
    excerpt: "Lonjakan premi asuransi pengapalan kargo minyak mentah memicu kenaikan ongkos angkut riil, menekan ruang fiskal negara importir minyak bumi seperti Indonesia.",
    content: `Setiap gejolak di mulut Selat Hormuz—jalur sempit yang dilalui seperlima pasokan minyak dunia setiap harinya—secara instan beresonansi ke ruang rapat Badan Anggaran parlemen di Senayan.

Kenaikan harga minyak mentah Indonesia (ICP) melampaui asumsi makro APBN bukan sekadar angka statistik. Setiap kenaikan satu dolar per barel menambah beban kompensasi energi hingga miliaran rupiah. Di sisi lain, menaikkan harga eceran BBM bersubsidi berisiko menyulut inflasi pangan dan menekan daya beli masyarakat kelas menengah-bawah.

Krisis ini sekali lagi menjadi cermin keras bagi urgensi percepatan diversifikasi transportasi publik teraliri listrik dan pembenahan tata kelola impor produk turunan minyak.`,
    coverImageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Tanker minyak mentah berlayar di selat navigasi internasional. Foto: Unsplash / Chris Gallagher.",
    status: "PUBLISHED",
    isHeadline: false,
    isBreaking: true,
    isOpinion: false,
    viewsCount: 21500,
    readingTime: 4,
    tags: ["Energi", "Geopolitik", "APBN", "Minyak"],
    publishedAt: "2026-11-08T15:20:00.000Z",
    authorId: "usr-2",
    categoryId: "cat-4",
  },
];
