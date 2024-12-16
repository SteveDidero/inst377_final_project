function greeting() {
    if (sessionStorage.getItem("loggedIn") == 'true') {
        document.getElementById("welcome").innerHTML = `Welcome, ${sessionStorage.getItem('user')}!`
    }
}

const countryCodes = [
    'us', 'ae', 'af', 'al', 'am', 'nl', 'ao', 'ar', 'au', 'aw',
    'az', 'ba', 'bb', 'bd', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo',
    'br', 'bs', 'bt', 'bw', 'by', 'bz', 'ca', 'cd', 'ch', 'cl',
    'cn', 'co', 'cr', 'cu', 'cv', 'cz', 'dj', 'dk', 'do', 'dz',
    'eg', 'er', 'et', 'eu', 'fj', 'fk', 'fo', 'gb', 'ge', 'gh',
    'gi', 'gm', 'gn', 'gt', 'gy', 'hk', 'hn', 'hr', 'ht', 'hu',
    'id', 'il', 'im', 'in', 'iq', 'ir', 'is', 'je', 'jm', 'jo',
    'jp', 'ke', 'kg', 'kh', 'ki', 'km', 'kr', 'kw', 'ky', 'kz',
    'la', 'lb', 'lk', 'lr', 'ls', 'ly', 'ma', 'md', 'mg', 'mk',
    'mm', 'mn', 'mo', 'mr', 'mu', 'mv', 'mw', 'mx', 'my', 'mz',
    'na', 'ng', 'ni', 'no', 'np', 'nz', 'om', 'pa', 'pe', 'pg',
    'ph', 'pk', 'pl', 'py', 'qa', 'ro', 'rs', 'ru', 'rw', 'sa',
    'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'sl', 'so', 'sr', 'ss',
    'st', 'sy', 'sz', 'th', 'tj', 'tm', 'tn', 'to', 'tr', 'tt',
    'tv', 'tw', 'tz', 'ua', 'ug', 'uy', 'uz', 've', 'vn', 'vu',
    'ws', 'xf', 'xc', 'xpf', 'ye', 'za', 'zm', 'zw'
];

const countryNames = {
    'us': 'United States', 'ae': 'United Arab Emirates', 'af': 'Afghanistan',
    'al': 'Albania', 'am': 'Armenia', 'nl': 'Netherlands', 'ao': 'Angola',
    'ar': 'Argentina', 'au': 'Australia', 'aw': 'Aruba', 'az': 'Azerbaijan',
    'ba': 'Bosnia and Herzegovina', 'bb': 'Barbados', 'bd': 'Bangladesh',
    'bg': 'Bulgaria', 'bh': 'Bahrain', 'bi': 'Burundi', 'bm': 'Bermuda',
    'bn': 'Brunei', 'bo': 'Bolivia', 'br': 'Brazil', 'bs': 'Bahamas',
    'bt': 'Bhutan', 'bw': 'Botswana', 'by': 'Belarus', 'bz': 'Belize',
    'ca': 'Canada', 'cd': 'Congo', 'ch': 'Switzerland', 'cl': 'Chile',
    'cn': 'China', 'co': 'Colombia', 'cr': 'Costa Rica', 'cu': 'Cuba',
    'cv': 'Cape Verde', 'cz': 'Czech Republic', 'dj': 'Djibouti',
    'dk': 'Denmark', 'do': 'Dominican Republic', 'dz': 'Algeria',
    'eg': 'Egypt', 'er': 'Eritrea', 'et': 'Ethiopia', 'eu': 'European Union',
    'fj': 'Fiji', 'fk': 'Falkland Islands', 'fo': 'Faroe Islands',
    'gb': 'United Kingdom', 'ge': 'Georgia', 'gh': 'Ghana', 'gi': 'Gibraltar',
    'gm': 'Gambia', 'gn': 'Guinea', 'gt': 'Guatemala', 'gy': 'Guyana',
    'hk': 'Hong Kong', 'hn': 'Honduras', 'hr': 'Croatia', 'ht': 'Haiti',
    'hu': 'Hungary', 'id': 'Indonesia', 'il': 'Israel', 'im': 'Isle of Man',
    'in': 'India', 'iq': 'Iraq', 'ir': 'Iran', 'is': 'Iceland', 'je': 'Jersey',
    'jm': 'Jamaica', 'jo': 'Jordan', 'jp': 'Japan', 'ke': 'Kenya',
    'kg': 'Kyrgyzstan', 'kh': 'Cambodia', 'ki': 'Kiribati', 'km': 'Comoros',
    'kr': 'South Korea', 'kw': 'Kuwait', 'ky': 'Cayman Islands',
    'kz': 'Kazakhstan', 'la': 'Laos', 'lb': 'Lebanon', 'lk': 'Sri Lanka',
    'lr': 'Liberia', 'ls': 'Lesotho', 'ly': 'Libya', 'ma': 'Morocco',
    'md': 'Moldova', 'mg': 'Madagascar', 'mk': 'North Macedonia', 'mm': 'Myanmar',
    'mn': 'Mongolia', 'mo': 'Macau', 'mr': 'Mauritania', 'mu': 'Mauritius',
    'mv': 'Maldives', 'mw': 'Malawi', 'mx': 'Mexico', 'my': 'Malaysia',
    'mz': 'Mozambique', 'na': 'Namibia', 'ng': 'Nigeria', 'ni': 'Nicaragua',
    'no': 'Norway', 'np': 'Nepal', 'nz': 'New Zealand', 'om': 'Oman',
    'pa': 'Panama', 'pe': 'Peru', 'pg': 'Papua New Guinea', 'ph': 'Philippines',
    'pk': 'Pakistan', 'pl': 'Poland', 'py': 'Paraguay', 'qa': 'Qatar',
    'ro': 'Romania', 'rs': 'Serbia', 'ru': 'Russia', 'rw': 'Rwanda',
    'sa': 'Saudi Arabia', 'sb': 'Solomon Islands', 'sc': 'Seychelles',
    'sd': 'Sudan', 'se': 'Sweden', 'sg': 'Singapore', 'sh': 'Saint Helena',
    'sl': 'Sierra Leone', 'so': 'Somalia', 'sr': 'Suriname', 'ss': 'South Sudan',
    'st': 'Sao Tome and Principe', 'sy': 'Syria', 'sz': 'Eswatini',
    'th': 'Thailand', 'tj': 'Tajikistan', 'tm': 'Turkmenistan', 'tn': 'Tunisia',
    'to': 'Tonga', 'tr': 'Turkey', 'tt': 'Trinidad and Tobago', 'tv': 'Tuvalu',
    'tw': 'Taiwan', 'tz': 'Tanzania', 'ua': 'Ukraine', 'ug': 'Uganda',
    'uy': 'Uruguay', 'uz': 'Uzbekistan', 've': 'Venezuela', 'vn': 'Vietnam',
    'vu': 'Vanuatu', 'ws': 'Samoa', 'xf': 'West African CFA franc',
    'xc': 'East Caribbean dollar', 'xpf': 'CFP franc', 'ye': 'Yemen',
    'za': 'South Africa', 'zm': 'Zambia', 'zw': 'Zimbabwe'
};

function loadFlags() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const countryNameBox = document.getElementById('countryNameBox');
    swiperWrapper.innerHTML = '';

    countryCodes.forEach(code => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        const img = document.createElement('img');
        img.src = `https://flagcdn.com/w320/${code}.png`;
        img.alt = code.toUpperCase();
        slide.appendChild(img);
        swiperWrapper.appendChild(slide);
    });

    const swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
    });

    swiper.on('slideChange', function () {
        const countryCode = countryCodes[swiper.realIndex];
        countryNameBox.textContent = countryNames[countryCode] || 'Unknown Country';
    });

    countryNameBox.textContent = countryNames[countryCodes[0]];
    greeting()
}

window.onload = loadFlags;