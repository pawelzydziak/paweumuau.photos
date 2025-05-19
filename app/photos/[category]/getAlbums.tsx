import fs from 'fs';
import path from 'path';

interface Album {
    name: string;
    displayName: string;
    cover: string;
}

const albumNameMap: { [key: string]: string } = {
    wlochy: 'Włochy',
    austria: 'Austria',
    berlin: 'Berlin',
    bratyslawa: 'Bratysława',
    budapeszt: 'Budapeszt',
    dubrovnik: 'Dubrownik',
    grecja: 'Grecja',
    helsinki: 'Helsinki',
    holandia: 'Holandia',
    hrwastka: 'Chorwacja',
    'niemcy-i-dania': 'Niemcy i Dania',
    norwegia: 'Norwegia',
    ostrawa: 'Ostrawa',
    phapos: 'Cypr',
    'praga-fonem': 'Praga',
    praha: 'Praga',
    ryga: 'Ryga',
    serbia: 'Serbia',
    'skalne-miasto': 'Skalne Miasto',
    slowenia: 'Słowenia',
    talinn: 'Tallin',
    triest: 'Triest',
    wenecja: 'Wenecja',
    wilno: 'Wilno',
    auschwitz: 'Auschwitz',
    'babia-gora': 'Babia Góra',
    chorzow: 'Chorzów',
    gliwice: 'Gliwice',
    gory: 'Góry',
    'jesien-wpkiw-2019': 'Jesień WPKiW 2019',
    katowice: 'Katowice',
    krakow: 'Kraków',
    krzyzne: 'Krzyżne',
    lodz: 'Łódź',
    mazury: 'Mazury',
    mikolow: 'Mikołów',
    nikiszowiec: 'Nikiszowiec',
    olsztyn: 'Olsztyn',
    'pustynia-na-zabich': 'Pustynia na Zabich',
    swierklaniec: 'Świerklaniec',
    warszawa: 'Warszawa',
    zoo: 'Zoo',
    autoportret: 'Autoportret',
    autoprezent: 'Autoprezent',
    forza: 'Forza',
    jedzenie: 'Jedzenie',
    kolejkowo: 'Kolejkowo',
    martin: 'Martin',
    maszyny: 'Maszyny',
    muzyka: 'Muzyka',
    photoshop: 'Photoshop',
    portrety: 'Portrety',
    przedmioty: 'Przedmioty',
    Rosliny: 'Rośliny',
    taes: 'TAES',
    Zwierzeta: 'Zwierzęta',
    Papugi: 'Papugi'
};

function formatAlbumName(name: string): string {
    return albumNameMap[name] || name;
}

export async function getAlbums(category: string): Promise<Album[]> {
    const categoryPath = path.join(process.cwd(), 'public', 'optimized', category);
    return fs
        .readdirSync(categoryPath, {withFileTypes: true})
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => ({
            name: dirent.name,
            displayName: formatAlbumName(dirent.name),
            cover: `/optimized/${category}/${dirent.name}/meta/cover.webp`
        }));
}