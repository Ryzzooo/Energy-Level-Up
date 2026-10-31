/* DATA: PAKET LENGKAP KUIS ARGUMENTASI ILMIAH TOULMIN (40 SOAL - 4 BAGIAN) */
const toulminQuizData = {
    part1: [
        {
            id: 1,
            type: 'claim',
            category: '🎯 TINGKAT DASAR: KLAIM ILMIAH',
            question: 'Sebuah desa memiliki banyak limbah pertanian. Warga mengusulkan limbah tersebut diolah menjadi biogas. Manakah yang merupakan klaim yang dapat diuji secara ilmiah?',
            options: [
                'Semua warga pasti menyukai biogas.',
                'Limbah pertanian berpotensi diolah menjadi biogas melalui proses yang sesuai.',
                'Biogas merupakan energi paling keren.',
                'Desa yang menggunakan biogas pasti lebih bahagia.'
            ],
            answer: 1,
            explanation: 'Opsi B merupakan klaim ilmiah karena dapat diuji dan dibuktikan secara empiris melalui proses kimia-biologis penguraian limbah.'
        },
        {
            id: 2,
            type: 'claim',
            category: '🎯 TINGKAT DASAR: KLAIM ILMIAH',
            question: 'Dalam diskusi biodiesel sawit, seorang siswa menyatakan, “Penggunaan biodiesel perlu dikaji berdasarkan manfaat energi dan dampak lingkungannya.” Pernyataan tersebut merupakan ...',
            options: [
                'Data hasil pengukuran.',
                'Sanggahan terhadap semua energi terbarukan.',
                'Klaim atau posisi awal yang dapat didiskusikan.',
                'Bukti bahwa biodiesel selalu merugikan.'
            ],
            answer: 2,
            explanation: 'Opsi C tepat: pernyataan tersebut adalah klaim atau posisi awal yang menuntut pengujian lebih lanjut antara manfaat energi vs dampak lingkungan.'
        },
        {
            id: 3,
            type: 'claim',
            category: '🎯 TINGKAT DASAR: KLAIM ILMIAH',
            question: 'Pernyataan manakah yang paling jelas merupakan opini tanpa dukungan ilmiah?',
            options: [
                'Pembakaran bahan bakar melepaskan energi.',
                'Biogas dapat mengandung metana.',
                'Bioenergi pasti menjadi sumber energi terbaik karena terdengar modern.',
                'Ketersediaan bahan baku memengaruhi produksi bioenergi.'
            ],
            answer: 2,
            explanation: 'Opsi C merupakan opini murni tanpa dasar ilmiah (hanya berdasarkan kesan kata "modern" tanpa bukti teknis atau empiris).'
        },
        {
            id: 4,
            type: 'claim',
            category: '🎯 TINGKAT DASAR: KLAIM ILMIAH',
            question: 'Sekolah ingin memanfaatkan sampah organik untuk menghasilkan biogas. Klaim yang paling tepat untuk dikaji adalah ...',
            options: [
                'Semua sampah sekolah bisa langsung menjadi biogas.',
                'Pengolahan sampah organik yang sesuai dapat menghasilkan biogas.',
                'Biogas tidak memerlukan proses pengolahan.',
                'Sampah organik selalu menghasilkan energi dalam jumlah sama.'
            ],
            answer: 1,
            explanation: 'Opsi B tepat karena mencerminkan prinsip ilmiah bahwa bahan organik perlu kondisi dan proses tertentu (anaerobik) untuk menghasilkan biogas.'
        },
        {
            id: 5,
            type: 'claim',
            category: '🎯 TINGKAT DASAR: KLAIM ILMIAH',
            question: 'Pemerintah mempertimbangkan peningkatan penggunaan biodiesel. Klaim yang paling seimbang adalah ...',
            options: [
                'Biodiesel tidak memiliki kekurangan apa pun.',
                'Biodiesel harus ditolak karena semua bioenergi merusak lingkungan.',
                'Biodiesel layak dipertimbangkan dengan menilai manfaat, bahan baku, dan dampaknya.',
                'Biodiesel selalu lebih murah daripada semua sumber energi lain.'
            ],
            answer: 2,
            explanation: 'Opsi C adalah klaim yang seimbang dalam kerangka isu sosiosaintifik (SSI) karena memperhitungkan manfaat energi, pasokan bahan baku, serta dampak lingkungan.'
        },
        {
            id: 6,
            type: 'claim',
            category: '🎯 TINGKAT DASAR: KLAIM ILMIAH',
            question: 'Manakah yang merupakan klaim tentang transisi energi?',
            options: [
                'Transisi energi adalah topik yang menarik.',
                'Peralihan menuju energi rendah emisi perlu mempertimbangkan keandalan pasokan dan dampak sosial.',
                'Semua teknologi energi memiliki dampak yang sama.',
                'Energi terbarukan tidak perlu direncanakan.'
            ],
            answer: 1,
            explanation: 'Opsi B menyajikan klaim argumentatif mengenai transisi energi yang mencakup keandalan teknis sistem dan dampak sosio-ekonomi masyarakat.'
        },
        {
            id: 7,
            type: 'claim',
            category: '🎯 TINGKAT DASAR: KLAIM ILMIAH',
            question: 'Dua kelompok berbeda pendapat tentang pemanfaatan lahan untuk tanaman bioenergi. Apa yang sebaiknya dilakukan sebelum menentukan posisi?',
            options: [
                'Memilih kelompok yang paling banyak anggotanya.',
                'Mengikuti pendapat yang paling sering muncul di media sosial.',
                'Memeriksa informasi tentang kebutuhan energi, pangan, lahan, dan lingkungan.',
                'Menolak semua informasi yang berbeda dari pendapat sendiri.'
            ],
            answer: 2,
            explanation: 'Opsi C mencerminkan sikap ilmiah: mengumpulkan data objektif tentang keterkaitan lahan, energi, pangan, dan ekosistem sebelum membangun klaim.'
        },
        {
            id: 8,
            type: 'claim',
            category: '🎯 TINGKAT DASAR: KLAIM ILMIAH',
            question: 'Sebuah kelompok mengklaim bahwa biogas dapat membantu mengurangi jumlah limbah organik yang dibuang. Klaim ini paling tepat diperiksa dengan ...',
            options: [
                'Menghitung jumlah limbah yang diolah dan membandingkannya dengan kondisi awal.',
                'Menanyakan apakah warna alat biogas menarik.',
                'Menghitung jumlah orang yang menyukai nama program.',
                'Memilih pendapat berdasarkan popularitas kelompok.'
            ],
            answer: 0,
            explanation: 'Opsi A benar karena mengukur efektivitas reduksi limbah secara kuantitatif sebelum dan sesudah intervensi biodigester.'
        },
        {
            id: 9,
            type: 'claim',
            category: '🎯 TINGKAT DASAR: KLAIM ILMIAH',
            question: 'Pernyataan yang menunjukkan posisi yang terbuka terhadap bukti baru adalah ...',
            options: [
                'Pendapat saya benar meskipun semua bukti berlawanan.',
                'Saya tidak akan mengubah pendapat dalam keadaan apa pun.',
                'Saya akan mempertimbangkan kembali klaim jika ditemukan bukti yang lebih kuat.',
                'Saya hanya menerima bukti yang mendukung pendapat saya.'
            ],
            answer: 2,
            explanation: 'Opsi C menunjukkan esensi bernalar ilmiah: kesediaan merevisi posisi atau klaim apabila disajikan data empiris yang lebih sahih dan kuat.'
        },
        {
            id: 10,
            type: 'claim',
            category: '🎯 TINGKAT DASAR: KLAIM ILMIAH',
            question: 'Dalam isu pemanfaatan minyak jelantah sebagai bahan baku biofuel, klaim awal yang paling tepat adalah ...',
            options: [
                'Semua minyak jelantah dapat langsung digunakan sebagai bahan bakar tanpa pengolahan.',
                'Minyak jelantah berpotensi menjadi bahan baku biofuel melalui proses yang sesuai.',
                'Minyak jelantah tidak memiliki kandungan energi.',
                'Biofuel dari minyak jelantah pasti tidak berdampak pada lingkungan.'
            ],
            answer: 1,
            explanation: 'Opsi B tepat karena minyak jelantah mengandung trigliserida yang dapat dikonversi menjadi ester metil asam lemak (biodiesel) melalui proses transesterifikasi.'
        }
    ],
    part2: [
        {
            id: 11,
            type: 'data',
            category: '📊 LEVEL BERKEMBANG: DATA & BUKTI',
            question: 'Sebuah sekolah menguji biodigester selama dua minggu. Data menunjukkan bahwa alat menghasilkan biogas pada hari-hari ketika bahan organik dimasukkan dan proses berlangsung sesuai kondisi yang dibutuhkan. Bukti ini paling mendukung klaim bahwa ...',
            options: [
                'Biogas selalu tersedia tanpa bahan baku.',
                'Biodigester dapat menghasilkan biogas dalam kondisi pengujian tersebut.',
                'Semua sekolah pasti memperoleh hasil identik.',
                'Biogas tidak memerlukan pemeliharaan.'
            ],
            answer: 1,
            explanation: 'Opsi B benar karena kesimpulan tidak melampaui batasan data yang diperoleh selama periode uji coba spesifik tersebut.'
        },
        {
            id: 12,
            type: 'data',
            category: '📊 LEVEL BERKEMBANG: DATA & BUKTI',
            question: 'Dua jenis bahan organik diuji dengan massa awal sama. Bahan A menghasilkan 12 liter biogas dan bahan B menghasilkan 8 liter. Kesimpulan yang paling tepat adalah ...',
            options: [
                'Bahan A menghasilkan volume biogas lebih besar dalam pengujian tersebut.',
                'Bahan A selalu lebih baik dalam semua kondisi.',
                'Bahan B tidak dapat menghasilkan energi.',
                'Bahan A pasti lebih ramah lingkungan.'
            ],
            answer: 0,
            explanation: 'Opsi A menyimpulkan fakta data secara akurat (12 L > 8 L) tanpa membuat generalisasi berlebihan ke aspek biaya atau lingkungan.'
        },
        {
            id: 13,
            type: 'data',
            category: '📊 LEVEL BERKEMBANG: DATA & BUKTI',
            question: 'Siswa ingin mengetahui apakah penggunaan kompor biogas mengurangi konsumsi LPG di rumah. Data paling relevan adalah ...',
            options: [
                'Warna kompor yang digunakan.',
                'Jumlah anggota keluarga di media sosial.',
                'Konsumsi LPG sebelum dan sesudah penggunaan biogas dengan memperhatikan kebutuhan memasak.',
                'Pendapat tetangga tentang desain kompor.'
            ],
            answer: 2,
            explanation: 'Opsi C menyajikan data komparasi kuantitatif sebelum vs sesudah intervensi pada parameter kebutuhan memasak yang terkontrol.'
        },
        {
            id: 14,
            type: 'data',
            category: '📊 LEVEL BERKEMBANG: DATA & BUKTI',
            question: 'Sebuah kelompok menyatakan biodiesel selalu mengurangi emisi sepanjang siklus hidupnya. Bukti yang paling dibutuhkan untuk menguji klaim tersebut adalah ...',
            options: [
                'Jumlah poster biodiesel yang dibagikan.',
                'Perbandingan emisi sepanjang siklus hidup dengan batas sistem dan asumsi yang jelas.',
                'Jumlah orang yang menyukai biodiesel.',
                'Foto kendaraan yang menggunakan biodiesel.'
            ],
            answer: 1,
            explanation: 'Opsi B benar karena membuktikan klaim emisi total membutuhkan kajian Life Cycle Assessment (LCA) yang memperhitungkan emisi pembukaan lahan, pupuk, pengolahan, dan pembakaran.'
        },
        {
            id: 15,
            type: 'data',
            category: '📊 LEVEL BERKEMBANG: DATA & BUKTI',
            question: 'Data ilustratif menunjukkan bahwa program A mengolah 20 kg sampah organik per hari, sedangkan program B mengolah 12 kg per hari. Jika tujuan yang dinilai adalah jumlah sampah organik yang diolah per hari, kesimpulan yang tepat adalah ...',
            options: [
                'Program A mengolah lebih banyak sampah dalam kondisi data tersebut.',
                'Program A pasti lebih murah.',
                'Program B pasti lebih ramah lingkungan.',
                'Program A menghasilkan energi dua kali lipat.'
            ],
            answer: 0,
            explanation: 'Opsi A tepat karena simpulan didasarkan langsung pada data numerik volume sampah yang diolah (20 kg/hari vs 12 kg/hari).'
        },
        {
            id: 16,
            type: 'data',
            category: '📊 LEVEL BERKEMBANG: DATA & BUKTI',
            question: 'Warga menduga instalasi bioenergi mengganggu kenyamanan karena bau. Bukti paling relevan untuk menguji dugaan itu adalah ...',
            options: [
                'Jumlah unggahan media sosial tentang instalasi.',
                'Warna bangunan instalasi.',
                'Pengukuran atau pencatatan bau di lokasi dan waktu yang relevan, disertai informasi kondisi operasional.',
                'Pendapat satu orang yang tidak pernah mengunjungi lokasi.'
            ],
            answer: 2,
            explanation: 'Opsi C menyajikan metode pembuktian empiris objektif: pengukuran gas/aroma pada radius dan variasi jam operasional instalasi.'
        },
        {
            id: 17,
            type: 'data',
            category: '📊 LEVEL BERKEMBANG: DATA & BUKTI',
            question: 'Data ilustratif sebuah eksperimen: 1 kg bahan X menghasilkan 10 unit energi, sedangkan 1 kg bahan Y menghasilkan 7 unit energi. Apa yang dapat disimpulkan?',
            options: [
                'Bahan X pasti lebih murah diproduksi.',
                'Bahan X menghasilkan lebih banyak energi per kilogram dalam eksperimen tersebut.',
                'Bahan Y tidak bisa digunakan sebagai bioenergi.',
                'Bahan X pasti mempunyai dampak lingkungan lebih rendah.'
            ],
            answer: 1,
            explanation: 'Opsi B tepat karena membatasi inferensi hanya pada rasio output energi per satuan massa yang teramati.'
        },
        {
            id: 18,
            type: 'data',
            category: '📊 LEVEL BERKEMBANG: DATA & BUKTI',
            question: 'Siswa ingin menilai apakah program biodiesel berpotensi memengaruhi harga bahan pangan. Bukti yang lebih kuat adalah ...',
            options: [
                'Satu komentar tanpa sumber di internet.',
                'Foto kebun sawit tanpa informasi tambahan.',
                'Perubahan harga dan pasokan bahan pangan serta informasi terkait penggunaan lahan dan permintaan bahan baku.',
                'Jumlah siswa yang mendukung program biodiesel.'
            ],
            answer: 2,
            explanation: 'Opsi C menyajikan korelasi ekonomi dan pasokan riil antara persaingan alokasi bahan baku (minyak sawit) untuk biofuel vs minyak goreng.'
        },
        {
            id: 19,
            type: 'data',
            category: '📊 LEVEL BERKEMBANG: DATA & BUKTI',
            question: 'Dalam laporan, satu kelompok hanya mewawancarai seorang warga yang mendukung biogas lalu menyimpulkan seluruh warga setuju. Kelemahan bukti tersebut adalah ...',
            options: [
                'Wawancara tidak pernah dapat menjadi sumber informasi.',
                'Bukti tersebut belum mewakili keragaman pandangan warga.',
                'Pendapat warga tidak boleh digunakan dalam penelitian.',
                'Kesimpulan akan benar jika wawancara dilakukan dengan cepat.'
            ],
            answer: 1,
            explanation: 'Opsi B tepat: ukuran sampel yang hanya 1 orang (n=1) mengandung bias representasi dan tidak dapat digeneralisasi mewakili seluruh komunitas.'
        },
        {
            id: 20,
            type: 'data',
            category: '📊 LEVEL BERKEMBANG: DATA & BUKTI',
            question: 'Sebuah desa mengklaim program bioenergi berhasil mengurangi limbah. Data yang paling kuat untuk mengevaluasi klaim tersebut adalah ...',
            options: [
                'Jumlah peserta saat peresmian program.',
                'Jumlah brosur yang dicetak.',
                'Foto instalasi saat baru dibangun.',
                'Jumlah dan jenis limbah sebelum dan sesudah program dalam periode yang sebanding.'
            ],
            answer: 3,
            explanation: 'Opsi D adalah data komparatif terkuat (kuantitas dan jenis sampah sebelum vs sesudah program) untuk memvalidasi klaim efektivitas.'
        }
    ],
    part3: [
        {
            id: 21,
            isShort: false,
            type: 'warrant',
            category: '🔗 TINGKAT MENENGAH–LANJUT: WARRANT (ALASAN ILMIAH)',
            question: 'Seorang siswa menyatakan, “Limbah organik layak dimanfaatkan untuk menghasilkan biogas karena dapat menjadi sumber energi sekaligus membantu mengolah limbah.” Alasan ilmiah yang paling tepat untuk mendukung klaim tersebut adalah ...',
            options: [
                'Limbah organik selalu tersedia dalam jumlah tidak terbatas.',
                'Bahan organik dapat terurai melalui proses biologis yang sesuai dan menghasilkan biogas yang mengandung metana.',
                'Semua jenis limbah dapat langsung menghasilkan biogas tanpa pengolahan.',
                'Biogas selalu menghasilkan energi lebih besar daripada semua sumber energi lain.'
            ],
            answer: 1,
            explanation: 'Opsi B menghubungkan fenomena ilmiah (biodegradasi anaerob oleh mikroorganisme menghasilkan gas metana CH4) sebagai dasar kelayakan biogas.'
        },
        {
            id: 22,
            isShort: false,
            type: 'warrant',
            category: '🔗 TINGKAT MENENGAH–LANJUT: WARRANT (ALASAN ILMIAH)',
            question: 'Kelompok A menyatakan biodiesel harus diperluas karena dapat menggantikan sebagian penggunaan bahan bakar fosil. Kelompok B mempertanyakan dampaknya terhadap penggunaan lahan. Mengapa kedua hal tersebut perlu dipertimbangkan bersama?',
            options: [
                'Karena semua sumber energi mempunyai dampak yang sama.',
                'Karena manfaat energi tidak berkaitan dengan penggunaan lahan.',
                'Karena manfaat energi perlu dinilai bersama dampak lingkungan, kebutuhan bahan baku, dan konsekuensi sosialnya.',
                'Karena dampak penggunaan lahan selalu lebih penting daripada kebutuhan energi.'
            ],
            answer: 2,
            explanation: 'Opsi C mencerminkan inti bernalar SSI: manfaat teknologi harus dievaluasi terintegrasi dengan dampak ekologis dan sosial ketersediaan lahan.'
        },
        {
            id: 23,
            isShort: false,
            type: 'warrant',
            category: '🔗 TINGKAT MENENGAH–LANJUT: WARRANT (ALASAN ILMIAH)',
            question: 'Sebuah percobaan menunjukkan bahan X menghasilkan biogas lebih banyak daripada bahan Y. Siswa kemudian menyimpulkan bahwa bahan X pasti lebih baik untuk semua masyarakat. Kelemahan penalaran tersebut adalah ...',
            options: [
                'Volume biogas tidak pernah dapat menjadi bukti ilmiah.',
                'Hasil percobaan tidak dapat digunakan untuk membandingkan bahan.',
                'Bahan X tidak mungkin digunakan sebagai bioenergi.',
                'Kesimpulan terlalu luas karena belum mempertimbangkan biaya, ketersediaan bahan, dan kondisi penerapan.'
            ],
            answer: 3,
            explanation: 'Opsi D menyoroti cacat logika generalisasi berlebihan: efisiensi laboratorium belum tentu menjamin kelayakan praktis, biaya, dan ketersediaan bahan di lapangan.'
        },
        {
            id: 24,
            isShort: false,
            type: 'warrant',
            category: '🔗 TINGKAT MENENGAH–LANJUT: WARRANT (ALASAN ILMIAH)',
            question: 'Seorang siswa berkata, “Bioenergi berasal dari bahan biologis, jadi penggunaannya pasti tidak menghasilkan emisi.” Penilaian yang paling tepat adalah ...',
            options: [
                'Klaim tersebut benar karena semua bahan biologis bebas emisi.',
                'Klaim tersebut perlu dikaji karena emisi dapat timbul saat pengolahan, transportasi, dan pembakaran bioenergi.',
                'Klaim tersebut benar selama bahan bakunya berasal dari tumbuhan.',
                'Klaim tersebut tidak dapat dibahas secara ilmiah.'
            ],
            answer: 1,
            explanation: 'Opsi B tepat karena secara ilmiah emisi gas rumah kaca tetap dilepaskan selama pemupukan, mesin panen, transportasi rantai pasok, dan pembakaran.'
        },
        {
            id: 25,
            isShort: false,
            type: 'warrant',
            category: '🔗 TINGKAT MENENGAH–LANJUT: WARRANT (ALASAN ILMIAH)',
            question: 'Data ilustratif menunjukkan bahwa sebuah instalasi biogas dapat memenuhi 30% kebutuhan energi memasak rumah tangga yang diamati. Kesimpulan paling logis adalah ...',
            options: [
                'Biogas pasti dapat memenuhi seluruh kebutuhan energi semua rumah tangga.',
                'Seluruh rumah tangga harus menghentikan penggunaan bahan bakar lain.',
                'Biogas berkontribusi terhadap kebutuhan energi pada rumah tangga yang diamati, tetapi kecukupannya perlu dikaji untuk kondisi lain.',
                'Biogas tidak bermanfaat karena kontribusinya kurang dari 100%.'
            ],
            answer: 2,
            explanation: 'Opsi C mengambil inferensi proporsional: mengakui kontribusi nyata 30% sekaligus tidak mengasumsikan swasembada 100% untuk kondisi lain.'
        },
        {
            id: 26,
            isShort: false,
            type: 'warrant',
            category: '🔗 TINGKAT MENENGAH–LANJUT: WARRANT (ALASAN ILMIAH)',
            question: 'Pemerintah daerah ingin membangun fasilitas bioenergi di dekat permukiman. Alasan paling kuat untuk melibatkan warga dalam pengambilan keputusan adalah ...',
            options: [
                'Warga perlu memperoleh kesempatan menyampaikan kekhawatiran dan informasi mengenai dampak lokal sebelum keputusan ditetapkan.',
                'Semua warga pasti menolak teknologi baru.',
                'Keputusan ilmiah sebaiknya ditentukan hanya berdasarkan suara terbanyak.',
                'Pendapat warga selalu menggantikan kebutuhan akan data ilmiah.'
            ],
            answer: 0,
            explanation: 'Opsi A benar: dalam isu sosiosaintifik, penerimaan publik, mitigasi bau, dan keselamatan warga setempat merupakan data pertimbangan penting.'
        },
        {
            id: 27,
            isShort: true,
            type: 'short',
            category: '📝 JAWABAN SINGKAT BERBASIS ALASAN',
            question: 'Sebuah desa mempunyai limbah kotoran ternak yang selama ini tidak dimanfaatkan. Warga ingin mengolahnya menjadi biogas. Tuliskan satu klaim yang mendukung atau menolak usulan tersebut, kemudian jelaskan alasan ilmiah yang mendasarinya.',
            prompt: 'Tuliskan jawaban sekitar 2–4 kalimat. Sertakan klaim posisi dan alasan ilmiahnya.',
            idealClaim: 'Limbah kotoran ternak berpotensi dimanfaatkan sebagai bahan baku biogas untuk memenuhi kebutuhan energi warga secara mandiri.',
            idealReason: 'Limbah kotoran ternak kaya akan materi organik dan bakteri metanogenik yang secara alami mengalami fermentasi anaerob menghasilkan gas metana (CH4) sebagai energi kalor terbarukan.',
            rubric: '2 Poin: Menyertakan klaim posisi jelas dan alasan ilmiah proses biologis anaerob. 1 Poin: Klaim atau alasan ada namun belum lengkap. 0 Poin: Belum tepat.'
        },
        {
            id: 28,
            isShort: true,
            type: 'short',
            category: '📝 JAWABAN SINGKAT BERBASIS ALASAN',
            question: 'Seorang siswa menyatakan, “Biodiesel dari kelapa sawit pasti ramah lingkungan karena berasal dari tumbuhan.” Apakah alasan tersebut cukup kuat? Jelaskan informasi tambahan yang diperlukan untuk menilai klaimnya.',
            prompt: 'Tuliskan jawaban sekitar 2–4 kalimat. Evaluasi kekuatan alasan dan sebutkan data tambahan yang diperlukan.',
            idealClaim: 'Alasan tersebut belum cukup kuat untuk membenarkan bahwa biodiesel sawit selalu ramah lingkungan dalam segala kondisi.',
            idealReason: 'Dibutuhkan data analisis siklus hidup (LCA), seperti apakah perkebunan sawit berasal dari pembukaan hutan alam (deforestasi gambut), jejak emisi pupuk kimia, serta emisi selama transportasi dan proses konversi energi.',
            rubric: '2 Poin: Mengidentifikasi alasan belum cukup kuat dan menyebutkan kebutuhan data LCA/deforestasi. 1 Poin: Jawaban sebagian benar. 0 Poin: Belum tepat.'
        },
        {
            id: 29,
            isShort: true,
            type: 'short',
            category: '📝 JAWABAN SINGKAT BERBASIS ALASAN',
            question: 'Sebuah kelompok menemukan bahwa produksi biogas meningkat ketika jumlah bahan organik yang dimasukkan bertambah. Apakah hasil tersebut cukup untuk membuktikan bahwa semakin banyak bahan organik selalu menghasilkan biogas semakin banyak? Jelaskan alasanmu.',
            prompt: 'Tuliskan jawaban sekitar 2–4 kalimat. Evaluasi batas generalisasi data tersebut.',
            idealClaim: 'Hasil percobaan tersebut tidak cukup membuktikan bahwa produksi gas akan selalu meningkat tanpa batas seiring penambahan bahan organik.',
            idealReason: 'Setiap biodigester memiliki batas kapasitas kerja bakteri anaerob (beban organik optimal). Jika bahan organik berlebihan (overloading), terjadi penumpukan asam lemak volatil yang menyebabkan pH anjlok (asidifikasi), mematikan bakteri metanogen, dan menghentikan pembentukan gas.',
            rubric: '2 Poin: Menjelaskan keterbatasan kapasitas biodigester dan penurunan pH/asidifikasi yang mematikan bakteri. 1 Poin: Alasan belum lengkap. 0 Poin: Belum tepat.'
        },
        {
            id: 30,
            isShort: true,
            type: 'short',
            category: '📝 JAWABAN SINGKAT BERBASIS ALASAN',
            question: 'Masyarakat berdebat tentang penggunaan lahan untuk tanaman bahan baku bioenergi. Sebutkan dua informasi ilmiah yang perlu diperiksa sebelum kamu menentukan pendapat, lalu jelaskan mengapa informasi tersebut penting.',
            prompt: 'Tuliskan jawaban sekitar 2–4 kalimat. Sebutkan 2 informasi ilmiah dan kepentingannya.',
            idealClaim: 'Dua informasi ilmiah yang krusial diperiksa adalah: (1) data neraca kebutuhan pangan & ketersediaan lahan produktif, serta (2) analisis emisi siklus hidup (LCA) dan keanekaragaman hayati.',
            idealReason: 'Data pangan penting agar budidaya bioenergi tidak memicu kelangkaan makanan pokok, sedangkan data emisi siklus hidup penting untuk memastikan alih fungsi lahan tidak menghasilkan pelepasan karbon yang lebih besar dibanding bahan bakar fosil.',
            rubric: '2 Poin: Menyebutkan 2 data ilmiah relevan (pangan/emisi/lahan) dan alasannya. 1 Poin: Hanya menyebutkan 1 data. 0 Poin: Belum tepat.'
        }
    ],
    part4: [
        {
            id: 31,
            title: 'Kasus #31: Pemanfaatan Limbah Menjadi Biogas',
            desc: 'Sebuah desa menghasilkan banyak limbah organik dari peternakan dan rumah tangga. Sebagian warga mendukung pembangunan instalasi biogas, sedangkan warga lain khawatir mengenai biaya pembangunan, potensi bau, dan kesulitan perawatannya.',
            task: 'Tuliskan argumenmu tentang apakah desa tersebut perlu mengembangkan biogas. Sertakan klaim, data ilmiah, alasan penghubung, dan sanggahan terhadap kekhawatiran warga.',
            ideal: {
                claim: 'Desa tersebut layak mengembangkan instalasi biogas berbasis limbah peternakan dan rumah tangga secara bertahap.',
                data: 'Limbah kotoran ternak dan sampah organik basah mengandung bahan organik tinggi yang dapat diolah melalui reaktor anaerob menjadi gas metana (CH4) sebagai energi kalor.',
                warrant: 'Pengolahan secara anaerobik dalam instalasi tertutup justru mereduksi bau limbah kotoran yang semula terbuka, sekaligus memangkas pengeluaran rumah tangga untuk pembelian gas tabung LPG.',
                rebuttal: 'Kekhawatiran biaya dan perawatan dapat dimitigasi dengan membentuk kelompok kerja perawatan desa dan memanfaatkan sisa lumpur digestat sebagai pupuk organik bernilai jual.'
            }
        },
        {
            id: 32,
            title: 'Kasus #32: Biodiesel Sawit dan Kebutuhan Energi',
            desc: 'Pemerintah ingin meningkatkan pemanfaatan biodiesel berbasis kelapa sawit (mandat B35/B40) untuk mengurangi impor solar fosil. Namun, koalisi masyarakat mempertanyakan dampaknya terhadap hutan alam, keanekaragaman hayati, dan keterbatasan lahan.',
            task: 'Apakah peningkatan pemanfaatan biodiesel sawit sebaiknya dilakukan? Susun argumen dengan menimbang manfaat energi serta konsekuensi ekologis dan sosial. Tanggapi argumen yang berlawanan.',
            ideal: {
                claim: 'Pemanfaatan biodiesel sawit dapat dilanjutkan sebagai strategi transisi jangka pendek, dengan syarat moratorium pembukaan hutan alam dan sertifikasi ISPO ketat.',
                data: 'Campuran biodiesel (Fatty Acid Methyl Ester) mampu memangkas emisi gas buang jelaga diesel dan menghemat cadangan devisa impor minyak fosil secara terbukti.',
                warrant: 'Manfaat bersih penurunan emisi bioenergi hanya bernilai positif apabila tidak terjadi emisi hutang karbon akibat kebakaran atau deforestasi lahan gambut.',
                rebuttal: 'Argumen bahwa biodiesel selalu bersih terbantahkan jika perkebunan sawit mengekspansi hutan alam; oleh karena itu intensifikasi produktivitas sawit rakyat dan riset limbah minyak jelantah (UCO) harus diprioritaskan.'
            }
        },
        {
            id: 33,
            title: 'Kasus #33: Bioenergi dan Ketahanan Pangan',
            desc: 'Sebuah wilayah merencanakan konversi sebagian sawah produktif menjadi kebun sorgum/tanaman energi untuk memasok pabrik bioetanol. Petani setempat cemas produksi beras lokal akan menurun drastis.',
            task: 'Tentukan posisimu dan bangun argumen berdasarkan hubungan antara kebutuhan energi, penggunaan lahan, dan ketahanan pangan. Jelaskan bukti apa yang perlu tersedia sebelum keputusan dibuat.',
            ideal: {
                claim: 'Lahan sawah produktif tidak boleh dialihfungsikan menjadi tanaman bioenergi demi menjaga swasembada pangan daerah.',
                data: 'Luas panen padi dan produksi beras lokal berbanding lurus dengan ketersediaan lahan sawah beririgasi teknis yang sulit digantikan.',
                warrant: 'Kebutuhan pangan bersifat mendasar bagi kelangsungan hidup populasi; mengorbankan lahan pangan untuk bahan bakar akan memicu lonjakan harga beras dan rawan pangan.',
                rebuttal: 'Sebagai solusinya, pabrik bioetanol dapat diarahkan memanfaatkan limbah jerami padi atau menggunakan lahan kering non-produktif (lahan marjinal) yang tidak bersaing dengan padi.'
            }
        },
        {
            id: 34,
            title: 'Kasus #34: Sampah Makanan sebagai Sumber Energi',
            desc: 'Kantin sekolah menghasilkan puluhan kilogram sisa makanan setiap hari. Kelompok A mengusulkan pengadaan biodigester sekolah, sedangkan Kelompok B berpendapat bahwa sekolah sebaiknya fokus kampanye pencegahan sisa makanan terlebih dahulu.',
            task: 'Menurutmu, bagaimana sebaiknya sekolah menangani sisa makanan? Bangun argumen yang membandingkan kedua usulan, menjelaskan alasan ilmiahnya, dan menanggapi kelemahan salah satu pilihan.',
            ideal: {
                claim: 'Sekolah sebaiknya menerapkan pendekatan terintegrasi: mengutamakan pencegahan pemborosan makanan (waste prevention) sembari mengolah sisa residu yang tak terhindarkan menjadi biogas.',
                data: 'Data piramida hierarki pengelolaan sampah menempatkan reduksi pada sumber (prevention) di tingkat tertinggi, diikuti pemanfaatan energi (recovery).',
                warrant: 'Mencegah sisa makanan menghemat seluruh energi bahan baku pangan dari hulu, sedangkan biodigester menyelesaikan limbah tak terhindarkan agar tidak mencemari TPA.',
                rebuttal: 'Jika hanya membangun biodigester tanpa kampanye pencegahan, perilaku membuang-buang makanan justru dianggap normal karena dianggap selalu bisa dijadikan gas.'
            }
        },
        {
            id: 35,
            title: 'Kasus #35: Transisi Energi di Daerah Terpencil',
            desc: 'Sebuah desa terpencil di pulau kecil masih bergantung pada genset solar yang mahal dan berpolusi. Ada usulan transisi menggunakan microgrid gabungan PLTS fotovoltaik dan pembangkit biomassa limbah lokal.',
            task: 'Apakah desa tersebut sebaiknya mulai beralih ke kombinasi energi terbarukan? Jelaskan posisimu dengan mempertimbangkan keandalan pasokan, kondisi lokal, biaya, dan dampak lingkungan. Berikan sanggahan terhadap salah satu keraguan.',
            ideal: {
                claim: 'Desa pulau terpencil tersebut sangat direkomendasikan beralih ke sistem microgrid hibrida PLTS dan biomassa lokal.',
                data: 'Biaya logistik pengiriman solar ke pulau terpencil sangat mahal dan rentan cuaca buruk, sementara potensi radiasi matahari lokal stabil sepanjang tahun.',
                warrant: 'Sistem hibrida saling melengkapi: PLTS memasok listrik siang hari, sedangkan biomassa/baterai menjamin stabilitas listrik malam hari tanpa ketergantungan pasokan bahan bakar dari luar pulau.',
                rebuttal: 'Kekhawatiran biaya investasi awal dapat diatasi dengan pendanaan dana desa dan bantuan transisi energi pemerintah, yang dalam jangka panjang jauh lebih ekonomis dibanding subsidi solar tahunan.'
            }
        },
        {
            id: 36,
            title: 'Kasus #36: Apakah Semua Bioenergi Berkelanjutan?',
            desc: 'Seorang pembicara menyatakan: “Karena bioenergi berasal dari bahan nabati yang dapat tumbuh kembali, maka semua bioenergi sudah pasti berkelanjutan dan ramah lingkungan tanpa kecuali.”',
            task: 'Evaluasilah pernyataan tersebut. Berikan klaim penilaian, bukti ilmiah relevan, alasan yang menghubungkan bukti dengan penilaianmu, serta sanggahan terhadap pernyataan pembicara tersebut.',
            ideal: {
                claim: 'Pernyataan tersebut keliru secara ilmiah; tidak semua bioenergi otomatis berkelanjutan dan bebas dampak lingkungan.',
                data: 'Penelitian Life Cycle Assessment (LCA) membuktikan bahwa bioenergi yang berasal dari pembabatan hutan primer atau lahan gambut justru melepaskan gas rumah kaca lebih besar daripada emisi batubara.',
                warrant: 'Status "terbarukan" (renewable) hanya merujuk pada kemampuan bahan baku untuk tumbuh kembali, sedangkan "berkelanjutan" (sustainable) menuntut keseimbangan ekologis, energi bersih, dan tanpa merusak daya dukung lingkungan.',
                rebuttal: 'Klaim ramah lingkungan hanya sah bila bahan baku berasal dari limbah organik sisa panen atau tanaman energi di lahan terdegradasi yang dikelola secara lestari.'
            }
        },
        {
            id: 37,
            title: 'Kasus #37: Memilih Program Bioenergi di Sekolah',
            desc: 'Sekolah mempunyai 2 pilihan proposal: Program A (membangun biodigester sekolah untuk edukasi sains dan gas kantin) vs Program B (bekerja sama dengan dinas kebersihan untuk mengangkut sampah ke bank sampah kota tanpa instalasi di sekolah).',
            task: 'Program manakah yang lebih layak dipilih sekolah? Jelaskan faktor kondisi lokal yang memengaruhi keputusanmu, bandingkan manfaat keduanya, dan berikan tanggapan kritis.',
            ideal: {
                claim: 'Kelayakan pilihan bergantung pada volume sampah harian sekolah: Program A lebih layak jika pasokan sampah organik kantin stabil >15 kg/hari dan tersedia guru penanggung jawab teknis.',
                data: 'Biodigester memerlukan rasio input harian yang teratur agar bakteri metanogen tidak mati, serta membutuhkan biaya perawatan rutin berkala.',
                warrant: 'Program A memberikan nilai laboratorium edukasi sains kontekstual bagi siswa SMA tentang energi terbarukan di samping manfaat gas kantin, yang tidak diperoleh dari sekadar membuang sampah ke dinas luar (Program B).',
                rebuttal: 'Namun jika sekolah kekurangan lahan terbuka yang aman dan tidak memiliki komitmen pemeliharaan, Program B lebih realistis guna menghindari risiko digester terbengkalai dan berbau.'
            }
        },
        {
            id: 38,
            title: 'Kasus #38: Data Ilmiah versus Pendapat Populer',
            desc: 'Di media sosial viral postingan yang mengklaim bahwa biodiesel 100% sawit (B100) adalah solusi terbaik tanpa kelemahan apa pun, dan disukai oleh ratusan ribu netizen tanpa data empiris pendukung.',
            task: 'Apakah banyaknya orang yang menyetujui klaim tersebut cukup untuk membuktikan kebenarannya? Susun argumen ilmiah mengenai cara mengevaluasi klaim viral dan tanggapi fenomena tersebut.',
            ideal: {
                claim: 'Popularitas atau jumlah dukungan netizen di media sosial tidak dapat dijadikan tolok ukur kebenaran ilmiah suatu klaim teknologi energi.',
                data: 'Uji teknis mesin otomotif menunjukkan bahwa B100 murni memiliki titik beku (cloud point) lebih tinggi, sifat higroskopis menyerap air, dan berpotensi menyumbat filter bahan bakar pada suhu dingin tanpa aditif khusus.',
                warrant: 'Kebenaran sains dibangun di atas metodologi pengujian empiris, verifikasi data terukur, dan telaah sejawat (peer-review), bukan atas dasar sentimen emosional atau jumlah klik (argumentum ad populum).',
                rebuttal: 'Meskipun antusiasme publik terhadap energi hijau patut diapresiasi, implementasi teknis skala besar tetap harus dipandu standar spesifikasi teknis dan analisis dampak teruji.'
            }
        },
        {
            id: 39,
            title: 'Kasus #39: Ketika Bukti Tidak Sepenuhnya Mendukung Klaim',
            desc: 'Sebuah proyek percontohan biogas komunal di desa berhasil mengolah limbah kandang sapi, namun pada bulan ke-4 volume produksi gas menurun 50% dan biaya perawatan katup digester membengkak melampaui estimasi awal.',
            task: 'Apakah proyek ini harus langsung ditutup atau dipertahankan? Susun argumen yang mempertimbangkan data hasil uji coba, jelaskan alasan penalarannya, dan tanggapi pihak yang ingin menutup proyek terburu-buru.',
            ideal: {
                claim: 'Proyek biogas komunal tersebut sebaiknya tidak langsung ditutup terburu-buru, melainkan dilakukan audit teknis evaluatif dan perbaikan operasional.',
                data: 'Data menunjukkan alat terbukti sukses menghasilkan gas pada 3 bulan pertama; penurunan di bulan ke-4 biasanya diakibatkan oleh perubahan suhu lingkungan, kadar air bahan baku, atau akumulasi endapan (sludge).',
                warrant: 'Dalam rekayasa teknologi terapan, kendala pada tahap uji coba awal merupakan data diagnosis berharga untuk menemukan rasio pengenceran substrat yang tepat dan jadwal perawatan preventif.',
                rebuttal: 'Menutup proyek secara prematur hanya akan membuang aset investasi modal yang sudah tertanam; penutupan hanya dibenarkan jika hasil audit membuktikan bahwa biaya perbaikan struktural melampaui seluruh nilai manfaat jangka panjangnya.'
            }
        },
        {
            id: 40,
            title: 'Kasus #40: Rekomendasi Transisi Energi yang Bertanggung Jawab',
            desc: 'Sebagai tim penasihat sains siswa SMA, kamu diminta memberi rekomendasi cetak biru transisi energi ramah lingkungan bagi kabupaten tempat tinggalmu yang memiliki limpahan limbah padi, kawasan pesisir berangin, serta keterbatasan APBD.',
            task: 'Buat rekomendasi kebijakan energi terintegrasi yang paling layak. Sertakan klaim utama, minimal 2 bukti ilmiah pertimbangan, alasan ilmiah, sanggahan terhadap opsi yang kurang tepat, dan batasan penerapan.',
            ideal: {
                claim: 'Pemerintah daerah sebaiknya memprioritaskan bauran energi berbasis PLTS Atap pada gedung publik dan pembangkit biomassa gasifikasi berbasis limbah sekam padi pertanian lokal.',
                data: 'Kabupaten memiliki ribuan ton sekam padi sisa panen yang selama ini dibakar terbuka menimbulkan polusi asap, serta memiliki intensitas insolasi surya harian tinggi di daerah pesisir.',
                warrant: 'Pemanfaatan sekam padi mengubah limbah pencemar menjadi energi listrik terdistribusi (circular economy), sementara PLTS atap menekan belanja listrik pemerintah secara langsung tanpa membutuhkan pembebasan lahan baru yang mahal.',
                rebuttal: 'Pilihan membangun pembangkit listrik tenaga angin skala besar kurang tepat untuk tahap awal karena memerlukan investasi turbin impor yang sangat mahal dan kecepatan angin pesisir yang fluktuatif musiman.'
            }
        }
    ]
};
