import {reactive} from 'vue'

export const store = reactive({
    currentIndex: 0,
    wrapperFolderPath: "public/img/content/",
    wrapperFolders:[
        {
            index: 0,
            folder:"APULIANSTILLLIFE",
            title:"APULIAN STILL LIFE",
            description: "",
            footnotes:[],
            cover: "COVER.webp",
            images:[
                "COVER.webp",
                "a1.webp",
                "a2.webp",
                "a3.webp"
            ]
        },
        {
            index: 1,
            folder:"ETHER",
            title:"ETHER",
            description: "",
            footnotes:[],
            cover: "COVER.webp",
            images:[
                "COVER.webp",
                "a1.webp",
                "a2.webp",
                "a3.webp",
                "a4.webp",
                "a5.webp",
                "a6.webp",
                "a7.webp",
                "a8.webp",
                "a9.webp",
                "a10.webp"
            ]
        },
        {
            index: 2,
            folder:"FILOARTIGIANO",
            title:"FILO ARTIGIANO",
            description: "",
            footnotes:[],
            cover: "COVER.webp",
            images:[
                "COVER.webp",
                "a1.webp",
                "a2.webp",
                "a3.webp",
                "a4.webp",
                "a5.webp",
                "a6.webp",
                "a7.webp",
                "a8.webp",
                "a9.webp"
            ]
        },
        {
            index: 3,
            folder:"PORTRAITOFPSYCHE",
            title:"PORTRAIT OF PSYCHE",
            description: "",
            footnotes:[],
            cover: "COVER.webp",
            images:[
                "COVER.webp",
                "a1.webp",
                "a2.webp",
                "a3.webp",
                "a4.webp",
                "a5.webp",
                "a6.webp"
            ]
        }, 
        {
            index: 4,
            folder:"READYMADE",
            title:"READY MADE",
            description: `Il progetto "ready-made" è ispirato, come si può immaginare dal nome, ad uno dei principi
                        cardine del pensiero di matrice duchampiana.
                        In particolare, il concetto indaga l’innovazione provocata dal decontestualizzare un oggetto dal
                        suo uso ordinario.
                        Fondamentalmente si decostruisce la percezione, l’uso e funzione, generando un contrasto, un
                        senso di estraniamento dell’(dall’) oggetto stesso.
                        Negli scatti questo intento è enfatizzato dalla partecipazione di due performers, che con le loro
                        pose(statiche ma dinamiche), poco comuni e ordinarie, creano un’interazione con l’oggetto che ne
                        denaturalizza l'idea "tradizionale" ,giocando , se vogliamo, con un linguaggio sarcastico,
                        accentuato dalle pose e dall’outifit.`,
            footnotes:["Foto 1-2: Lampada da tavolo Dania di Dario Tognon e Studio Celli per Artemide, 1969",
                        "Foto 3-7: Poltrone Montebello di Kazuhide Takahama per Gavina, 1980",
                        "Foto 8-9: Lampada a sospensione Taraxacum 1, prodotta da Flos e disegnata dai Fratelli",
                        "Castiglioni, Achille e Pier Giacomo nel 1960",
                        "Foto 10-13: Poltrona Bertoia Diamond realizzata da Harry Bertoia per Knoll, 1952",
                        "Foto 14-18: poltrona non so"
                    ],
            cover: "COVER.webp",
            images:[
                "COVER.webp",
                "1.webp",
                "2.webp",
                "3.webp",
                "4.webp",
                "5.webp",
                "6.webp",
                "7.webp",
                "8.webp",
                "10.webp",
                "11.webp",
                "12.webp",
                "13.webp",
                "14.webp",
                "18.webp"
            ]
        },   
        {
            index: 5,
            folder:"STATICHE_MIGRAZIONI",
            title:"STATICHE MIGRAZIONI",
            description: `il progetto “statiche migrazioni” rappresenta il tema della migrazione degli uccelli legata al cambiamento climatico.
            quest’immagine raffigura un uccello con la testa coperta da un velo, un simbolo eloquente dell'umanità che spesso nega o ignora il problema del cambiamento climatico.
            Alle spalle dell'uccello, si staglia un imminente temporale, che rappresenta in modo metaforico le catastrofi naturali scatenate dal cambiamento climatico. Questa fotografia vuole evocare una profonda riflessione sulla responsabilità umana nei confronti dell'ambiente e degli effetti che il nostro comportamento ha sulle creature che condividono il nostro pianeta.
            EXIBITHION: Vienna, galleria hinterland`,
            footnotes:[],
            cover: "COVER.webp",
            images:[
                "COVER.webp",
            ]
        }, 
        {
            index: 6,
            folder:"TRUEWHITEHORSE",
            title:"TRUE WHITE HORSE",
            description: "",
            footnotes:[],
            cover: "COVER.webp",
            images:[
                "COVER.webp",
                "a1.webp"
            ]
        },
        {
            index: 7,
            folder:"ICON",
            title:"ICON",
            description: "",
            footnotes:[],
            cover: "COVER.webp",
            images:[
                "COVER.webp",
                "a1.webp",
                "a2.webp",
                "a3.webp",
                "a4.webp",
                "a5.webp",
                "a6.webp",
                "a7.webp",
                "a8.webp"
            ]
        },
    ]
})