export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
  total: number;
}

export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

export interface TypeDetail {
  ko: string;
  bg: string;
  text: string;
  border: string;
}

export const TYPE_MAP: Record<PokemonType, TypeDetail> = {
  normal: { ko: '노말', bg: 'bg-stone-500', text: 'text-stone-100', border: 'border-stone-400' },
  fire: { ko: '불꽃', bg: 'bg-red-500', text: 'text-white', border: 'border-red-400' },
  water: { ko: '물', bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-400' },
  grass: { ko: '풀', bg: 'bg-emerald-500', text: 'text-white', border: 'border-emerald-400' },
  electric: { ko: '전기', bg: 'bg-amber-400', text: 'text-stone-900', border: 'border-amber-300' },
  ice: { ko: '얼음', bg: 'bg-cyan-400', text: 'text-stone-900', border: 'border-cyan-300' },
  fighting: { ko: '격투', bg: 'bg-orange-700', text: 'text-white', border: 'border-orange-500' },
  poison: { ko: '독', bg: 'bg-purple-600', text: 'text-white', border: 'border-purple-400' },
  ground: { ko: '땅', bg: 'bg-amber-700', text: 'text-white', border: 'border-amber-500' },
  flying: { ko: '비행', bg: 'bg-indigo-400', text: 'text-white', border: 'border-indigo-300' },
  psychic: { ko: '에스퍼', bg: 'bg-pink-500', text: 'text-white', border: 'border-pink-400' },
  bug: { ko: '벌레', bg: 'bg-lime-500', text: 'text-stone-900', border: 'border-lime-400' },
  rock: { ko: '바위', bg: 'bg-yellow-700', text: 'text-white', border: 'border-yellow-600' },
  ghost: { ko: '고스트', bg: 'bg-purple-800', text: 'text-white', border: 'border-purple-500' },
  dragon: { ko: '드래곤', bg: 'bg-indigo-700', text: 'text-white', border: 'border-indigo-500' },
  dark: { ko: '악', bg: 'bg-stone-800', text: 'text-white', border: 'border-stone-600' },
  steel: { ko: '강철', bg: 'bg-slate-400', text: 'text-stone-900', border: 'border-slate-300' },
  fairy: { ko: '페어리', bg: 'bg-pink-400', text: 'text-white', border: 'border-pink-300' },
};

export interface Pokemon {
  id: number;
  name: string;
  nameEn: string;
  category: string;
  types: PokemonType[];
  image: string;
  sprite: string;
  height: number; // meters
  weight: number; // kg
  stats: PokemonStats;
  description: string;
  generation: number;
  isLegendary?: boolean;
}

const getArt = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
const getSprite = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const POKEMON_LIST: Pokemon[] = [
  {
    id: 25,
    name: '피카츄',
    nameEn: 'Pikachu',
    category: '쥐포켓몬',
    types: ['electric'],
    image: getArt(25),
    sprite: getSprite(25),
    height: 0.4,
    weight: 6.0,
    generation: 1,
    description: '양 볼의 전기 주머니에 전기를 모아둔다. 위급할 때 강한 전격을 방출해 상대방을 위협한다.',
    stats: { hp: 35, attack: 55, defense: 40, spAtk: 50, spDef: 50, speed: 90, total: 320 }
  },
  {
    id: 6,
    name: '리자몽',
    nameEn: 'Charizard',
    category: '화염포켓몬',
    types: ['fire', 'flying'],
    image: getArt(6),
    sprite: getSprite(6),
    height: 1.7,
    weight: 90.5,
    generation: 1,
    description: '강한 상대를 찾아 하늘을 날아다닌다. 무엇이든 녹여버리는 고열의 불꽃을 분사한다.',
    stats: { hp: 78, attack: 84, defense: 78, spAtk: 109, spDef: 85, speed: 100, total: 534 }
  },
  {
    id: 150,
    name: '뮤츠',
    nameEn: 'Mewtwo',
    category: '유전자포켓몬',
    types: ['psychic'],
    image: getArt(150),
    sprite: getSprite(150),
    height: 2.0,
    weight: 122.0,
    generation: 1,
    isLegendary: true,
    description: '뮤의 유전자를 재조합하여 탄생했다. 극한의 사이코 파워를 가지고 있으며 전투 특화 포켓몬이다.',
    stats: { hp: 106, attack: 110, defense: 90, spAtk: 154, spDef: 90, speed: 130, total: 680 }
  },
  {
    id: 448,
    name: '루카리오',
    nameEn: 'Lucario',
    category: '파동포켓몬',
    types: ['fighting', 'steel'],
    image: getArt(448),
    sprite: getSprite(448),
    height: 1.2,
    weight: 54.0,
    generation: 4,
    description: '상대가 발산하는 파동을 감지하여 생각과 행동을 미리 알아챈다. 강력한 오라구체를 사용한다.',
    stats: { hp: 70, attack: 110, defense: 70, spAtk: 115, spDef: 70, speed: 90, total: 525 }
  },
  {
    id: 94,
    name: '팬텀',
    nameEn: 'Gengar',
    category: '그림자포켓몬',
    types: ['ghost', 'poison'],
    image: getArt(94),
    sprite: getSprite(94),
    height: 1.5,
    weight: 40.5,
    generation: 1,
    description: '만월의 밤, 그림자가 멋대로 움직여서 웃고 있다면 팬텀의 짓이다.',
    stats: { hp: 60, attack: 65, defense: 60, spAtk: 130, spDef: 75, speed: 110, total: 500 }
  },
  {
    id: 133,
    name: '이브이',
    nameEn: 'Eevee',
    category: '진화포켓몬',
    types: ['normal'],
    image: getArt(133),
    sprite: getSprite(133),
    height: 0.3,
    weight: 6.5,
    generation: 1,
    description: '불균형하고 불안정한 유전자를 가지고 있어 여러 형태로 진화할 수 있는 가능성을 지닌다.',
    stats: { hp: 55, attack: 55, defense: 50, spAtk: 45, spDef: 65, speed: 55, total: 325 }
  },
  {
    id: 658,
    name: '개굴닌자',
    nameEn: 'Greninja',
    category: '닌자포켓몬',
    types: ['water', 'dark'],
    image: getArt(658),
    sprite: getSprite(658),
    height: 1.5,
    weight: 40.0,
    generation: 6,
    description: '물을 다루는 닌자처럼 압축된 물로 만든 수리검을 날린다. 쇠붙이도 단숨에 베어낸다.',
    stats: { hp: 72, attack: 95, defense: 67, spAtk: 103, spDef: 71, speed: 122, total: 530 }
  },
  {
    id: 143,
    name: '잠만보',
    nameEn: 'Snorlax',
    category: '졸음포켓몬',
    types: ['normal'],
    image: getArt(143),
    sprite: getSprite(143),
    height: 2.1,
    weight: 460.0,
    generation: 1,
    description: '매일 400kg의 음식을 먹지 않으면 배가 차지 않는다. 다 먹고 나면 곧바로 잠들어 버린다.',
    stats: { hp: 160, attack: 110, defense: 65, spAtk: 65, spDef: 110, speed: 30, total: 540 }
  },
  {
    id: 384,
    name: '레쿠쟈',
    nameEn: 'Rayquaza',
    category: '천공포켓몬',
    types: ['dragon', 'flying'],
    image: getArt(384),
    sprite: getSprite(384),
    height: 7.0,
    weight: 206.5,
    generation: 3,
    isLegendary: true,
    description: '오존층에서 수억 년간 계속 살아왔다고 전해지는 전설의 포켓몬. 공기 중의 먼지를 섭취한다.',
    stats: { hp: 105, attack: 150, defense: 90, spAtk: 150, spDef: 90, speed: 95, total: 680 }
  },
  {
    id: 445,
    name: '한카리아스',
    nameEn: 'Garchomp',
    category: '마하포켓몬',
    types: ['dragon', 'ground'],
    image: getArt(445),
    sprite: getSprite(445),
    height: 1.9,
    weight: 95.0,
    generation: 4,
    description: '몸을 접고 날개를 펼치면 제트기 못지않은 음속으로 하늘을 날며 먹잇감을 포획한다.',
    stats: { hp: 108, attack: 130, defense: 95, spAtk: 80, spDef: 85, speed: 102, total: 600 }
  },
  {
    id: 9,
    name: '거북왕',
    nameEn: 'Blastoise',
    category: '껍질포켓몬',
    types: ['water'],
    image: getArt(9),
    sprite: getSprite(9),
    height: 1.6,
    weight: 85.5,
    generation: 1,
    description: '등껍질에 장착된 두 개의 분사구에서 나오는 고압 수류는 철판도 뚫을 정도의 파괴력을 자랑한다.',
    stats: { hp: 79, attack: 83, defense: 100, spAtk: 85, spDef: 105, speed: 78, total: 530 }
  },
  {
    id: 3,
    name: '이상해꽃',
    nameEn: 'Venusaur',
    category: '씨앗포켓몬',
    types: ['grass', 'poison'],
    image: getArt(3),
    sprite: getSprite(3),
    height: 2.0,
    weight: 100.0,
    generation: 1,
    description: '등에 꽃을 피워 햇빛을 흡수해 에너지로 바꾼다. 꽃에서 피어나는 기분 좋은 향기가 주위를 감싼다.',
    stats: { hp: 80, attack: 82, defense: 83, spAtk: 100, spDef: 100, speed: 80, total: 525 }
  },
  {
    id: 149,
    name: '망나뇽',
    nameEn: 'Dragonite',
    category: '드래곤포켓몬',
    types: ['dragon', 'flying'],
    image: getArt(149),
    sprite: getSprite(149),
    height: 2.2,
    weight: 210.0,
    generation: 1,
    description: '지구 한 바퀴를 약 16시간 만에 돌아버릴 만큼 빠른 속도로 비행할 수 있는 포켓몬이다.',
    stats: { hp: 91, attack: 134, defense: 95, spAtk: 100, spDef: 100, speed: 80, total: 600 }
  },
  {
    id: 282,
    name: '가디안',
    nameEn: 'Gardevoir',
    category: '포옹포켓몬',
    types: ['psychic', 'fairy'],
    image: getArt(282),
    sprite: getSprite(282),
    height: 1.6,
    weight: 48.4,
    generation: 3,
    description: '트레이너를 지키기 위해서라면 모든 사이코 파워를 사용하여 소형 블랙홀까지 만들어낸다.',
    stats: { hp: 68, attack: 65, defense: 65, spAtk: 125, spDef: 115, speed: 80, total: 518 }
  },
  {
    id: 197,
    name: '블래키',
    nameEn: 'Umbreon',
    category: '달빛포켓몬',
    types: ['dark'],
    image: getArt(197),
    sprite: getSprite(197),
    height: 1.0,
    weight: 27.0,
    generation: 2,
    description: '달빛을 쬐면 몸의 고리 문양이 노랗게 빛나며 미지의 부유 에너지가 넘쳐흐른다.',
    stats: { hp: 95, attack: 65, defense: 110, spAtk: 60, spDef: 130, speed: 65, total: 525 }
  },
  {
    id: 59,
    name: '윈디',
    nameEn: 'Arcanine',
    category: '전설포켓몬',
    types: ['fire'],
    image: getArt(59),
    sprite: getSprite(59),
    height: 1.9,
    weight: 155.0,
    generation: 1,
    description: '중국 전통 벽화에도 그려진 오래된 포켓몬. 하루만에 10,000km 거리를 쾌속 주행한다.',
    stats: { hp: 90, attack: 110, defense: 80, spAtk: 100, spDef: 80, speed: 95, total: 555 }
  },
  {
    id: 130,
    name: '갸라도스',
    nameEn: 'Gyarados',
    category: '흉악포켓몬',
    types: ['water', 'flying'],
    image: getArt(130),
    sprite: getSprite(130),
    height: 6.5,
    weight: 235.0,
    generation: 1,
    description: '한번 날뛰기 시작하면 주변을 초토화시킬 때까지 멈추지 않는 매우 파괴적인 성격이다.',
    stats: { hp: 95, attack: 125, defense: 79, spAtk: 60, spDef: 100, speed: 81, total: 540 }
  },
  {
    id: 254,
    name: '나무킹',
    nameEn: 'Sceptile',
    category: '밀림포켓몬',
    types: ['grass'],
    image: getArt(254),
    sprite: getSprite(254),
    height: 1.7,
    weight: 52.2,
    generation: 3,
    description: '양팔에 난 잎사귀 날을 휘둘러 그 어떤 큰 나무도 단숨에 잘라내는 숲의 제왕이다.',
    stats: { hp: 70, attack: 85, defense: 65, spAtk: 105, spDef: 85, speed: 120, total: 530 }
  },
  {
    id: 257,
    name: '번치코',
    nameEn: 'Blaziken',
    category: '무술포켓몬',
    types: ['fire', 'fighting'],
    image: getArt(257),
    sprite: getSprite(257),
    height: 1.9,
    weight: 52.0,
    generation: 3,
    description: '강적을 만나면 발목에서 불꽃을 분사하며 용맹하게 덤벼든다. 건물도 뛰어넘는 점프력을 가졌다.',
    stats: { hp: 80, attack: 120, defense: 70, spAtk: 110, spDef: 70, speed: 80, total: 530 }
  },
  {
    id: 131,
    name: '라프라스',
    nameEn: 'Lapras',
    category: '탈것포켓몬',
    types: ['water', 'ice'],
    image: getArt(131),
    sprite: getSprite(131),
    height: 2.5,
    weight: 220.0,
    generation: 1,
    description: '사람의 말을 이해하는 온순하고 높은 지능을 지닌 포켓몬. 바다 위를 기분 좋게 헤엄친다.',
    stats: { hp: 130, attack: 85, defense: 80, spAtk: 85, spDef: 95, speed: 60, total: 535 }
  },
  {
    id: 248,
    name: '마기라스',
    nameEn: 'Tyranitar',
    category: '갑옷포켓몬',
    types: ['rock', 'dark'],
    image: getArt(248),
    sprite: getSprite(248),
    height: 2.0,
    weight: 202.0,
    generation: 2,
    description: '한 손으로 산을 허물고 지형을 바꿀 만큼 위협적인 괴력을 가졌으며 튼튼한 갑옷에 둘러싸여 있다.',
    stats: { hp: 100, attack: 134, defense: 110, spAtk: 95, spDef: 100, speed: 61, total: 600 }
  },
  {
    id: 249,
    name: '루기아',
    nameEn: 'Lugia',
    category: '잠수포켓몬',
    types: ['psychic', 'flying'],
    image: getArt(249),
    sprite: getSprite(249),
    height: 5.2,
    weight: 216.0,
    generation: 2,
    isLegendary: true,
    description: '날갯짓 한번으로 폭풍을 일으킨다. 강력한 힘 때문에 해저 깊은 곳에서 조용히 잠들어 있다.',
    stats: { hp: 106, attack: 90, defense: 130, spAtk: 90, spDef: 154, speed: 110, total: 680 }
  },
  {
    id: 250,
    name: '칠색조',
    nameEn: 'Ho-Oh',
    category: '무지개포켓몬',
    types: ['fire', 'flying'],
    image: getArt(250),
    sprite: getSprite(250),
    height: 3.8,
    weight: 199.0,
    generation: 2,
    isLegendary: true,
    description: '무지갯빛 날개로 하늘을 난다. 칠색조를 본 사람은 영원한 행복이 약속된다고 한다.',
    stats: { hp: 106, attack: 130, defense: 90, spAtk: 110, spDef: 154, speed: 90, total: 680 }
  },
  {
    id: 700,
    name: '님피아',
    nameEn: 'Sylveon',
    category: '연결포켓몬',
    types: ['fairy'],
    image: getArt(700),
    sprite: getSprite(700),
    height: 1.0,
    weight: 23.5,
    generation: 6,
    description: '리본 형태의 더듬이에서 적대감을 다스리는 파동을 보내 싸움을 멈추게 만든다.',
    stats: { hp: 95, attack: 65, defense: 65, spAtk: 110, spDef: 130, speed: 60, total: 525 }
  },
  {
    id: 778,
    name: '따라큐',
    nameEn: 'Mimikyu',
    category: '탈포켓몬',
    types: ['ghost', 'fairy'],
    image: getArt(778),
    sprite: getSprite(778),
    height: 0.2,
    weight: 0.7,
    generation: 7,
    description: '사람들과 친해지고 싶어 피카츄를 본뜬 걸레 같은 누더기를 뒤집어쓰고 다니는 외로운 포켓몬.',
    stats: { hp: 55, attack: 90, defense: 80, spAtk: 50, spDef: 105, speed: 96, total: 476 }
  },
  {
    id: 823,
    name: '아머까오',
    nameEn: 'Corviknight',
    category: '까마귀포켓몬',
    types: ['flying', 'steel'],
    image: getArt(823),
    sprite: getSprite(823),
    height: 2.2,
    weight: 75.0,
    generation: 8,
    description: '가라르 지방의 하늘에서 무적이라 불리는 포켓몬. 공중 택시로도 대활약하고 있다.',
    stats: { hp: 98, attack: 87, defense: 105, spAtk: 53, spDef: 85, speed: 67, total: 495 }
  },
  {
    id: 887,
    name: '드래펄트',
    nameEn: 'Dragapult',
    category: '스텔스포켓몬',
    types: ['dragon', 'ghost'],
    image: getArt(887),
    sprite: getSprite(887),
    height: 3.0,
    weight: 50.0,
    generation: 8,
    description: '뿔 구멍에 드라꼰을 넣어 살고 있으며, 음속으로 드라꼰을 분사하여 격돌시킨다.',
    stats: { hp: 88, attack: 120, defense: 75, spAtk: 100, spDef: 75, speed: 142, total: 600 }
  },
  {
    id: 959,
    name: '두두림쥐',
    nameEn: 'Tinkaton',
    category: '망치포켓몬',
    types: ['fairy', 'steel'],
    image: getArt(959),
    sprite: getSprite(959),
    height: 1.2,
    weight: 112.8,
    generation: 9,
    description: '100kg이 넘는 쇠망치를 가볍게 휘둘러 아머까오를 사냥하는 대담한 포켓몬이다.',
    stats: { hp: 85, attack: 75, defense: 77, spAtk: 70, spDef: 105, speed: 94, total: 506 }
  },
  {
    id: 1007,
    name: '코라이돈',
    nameEn: 'Koraidon',
    category: '날개치는포켓몬',
    types: ['fighting', 'dragon'],
    image: getArt(1007),
    sprite: getSprite(1007),
    height: 2.5,
    weight: 303.0,
    generation: 9,
    isLegendary: true,
    description: '고대의 전설 포켓몬. 대지를 가르는 전력 투구로 상대를 압도한다.',
    stats: { hp: 100, attack: 135, defense: 115, spAtk: 85, spDef: 100, speed: 135, total: 670 }
  },
  {
    id: 1008,
    name: '미라이돈',
    nameEn: 'Miraidon',
    category: '무쇠포켓몬',
    types: ['electric', 'dragon'],
    image: getArt(1008),
    sprite: getSprite(1008),
    height: 2.8,
    weight: 240.0,
    generation: 9,
    isLegendary: true,
    description: '미래에서 찾아온 사이버 포켓몬. 전격 광선을 마하의 속도로 연사한다.',
    stats: { hp: 100, attack: 85, defense: 100, spAtk: 135, spDef: 115, speed: 135, total: 670 }
  },
  {
    id: 52,
    name: '나옹',
    nameEn: 'Meowth',
    category: '고양이포켓몬',
    types: ['normal'],
    image: getArt(52),
    sprite: getSprite(52),
    height: 0.4,
    weight: 4.2,
    generation: 1,
    description: '반짝이는 물건을 매우 좋아한다. 이마의 금화가 맑게 빛나면 기분이 매우 양호하다.',
    stats: { hp: 40, attack: 45, defense: 35, spAtk: 40, spDef: 40, speed: 90, total: 290 }
  },
  {
    id: 175,
    name: '토게피',
    nameEn: 'Togepi',
    category: '볼풀포켓몬',
    types: ['fairy'],
    image: getArt(175),
    sprite: getSprite(175),
    height: 0.3,
    weight: 1.5,
    generation: 2,
    description: '껍질 안에 행복이 가득 차 있다. 정성스럽게 대해주면 행복을 공유해 준다.',
    stats: { hp: 35, attack: 20, defense: 65, spAtk: 40, spDef: 65, speed: 20, total: 245 }
  }
];

export const PRESET_ROSTERS = [
  {
    id: 'random',
    title: '랜덤 16강 (무작위)',
    desc: '모든 포켓몬 중 무작위로 16마리를 추려 토너먼트를 진행합니다.'
  },
  {
    id: 'gen1',
    title: '1세대 레전드 16강',
    desc: '피카츄, 리자몽, 뮤츠 등 추억의 1세대 간판 포켓몬 대격돌!'
  },
  {
    id: 'legendary',
    title: '전설 & 600족 대전 16강',
    desc: '뮤츠, 레쿠쟈, 한카리아스, 드래펄트 등 최강의 능력치를 지닌 16강!'
  },
  {
    id: 'cute',
    title: '귀여움 박빙 16강',
    desc: '피카츄, 이브이, 님피아, 토게피, 따라큐 등 러블리 포켓몬 대결!'
  }
];

export function getRandom16Pokemon(filterMode: string = 'random'): Pokemon[] {
  let list = [...POKEMON_LIST];
  if (filterMode === 'gen1') {
    list = list.filter(p => p.generation === 1);
  } else if (filterMode === 'legendary') {
    list = list.filter(p => p.isLegendary || p.stats.total >= 580);
  } else if (filterMode === 'cute') {
    const cuteNames = ['피카츄', '이브이', '님피아', '토게피', '따라큐', '나옹', '가디안', '이상해꽃', '두두림쥐', '루카리오', '개굴닌자'];
    list = list.filter(p => cuteNames.includes(p.name));
  }

  // Shuffle array using Fisher-Yates
  const shuffled = [...list];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Ensure exactly 16
  if (shuffled.length < 16) {
    const remainingNeeded = 16 - shuffled.length;
    const fillers = POKEMON_LIST.filter(p => !shuffled.some(s => s.id === p.id));
    for (let i = 0; i < remainingNeeded && i < fillers.length; i++) {
      shuffled.push(fillers[i]);
    }
  }

  return shuffled.slice(0, 16);
}
