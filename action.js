// const baseUrl = "https://retoolapi.dev/DcJllE/guests";
const axiosConfig = {}

const Aksi = {};

Aksi.timeDifference = (previous, current=null) => {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    if(! current) {
        current = new Date().valueOf();
    }
    previous = new Date(previous).valueOf();

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' detik lalu';
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' menit lalu';
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' jam lalu';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' hari lalu';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' bulan lalu';
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' tahun lalu';
    }
}

Aksi.postGreeting = async (name, text) => {
    try {
        const reqData = {
            name: name,
            greeting: text,
            // ts: new Date().valueOf(),
            ts: new Date(),
        }

        const responseData = await axios.post(baseUrl + '/api/greeting', reqData, axiosConfig);
        alert("Terimakasih atas doa/ucapannya!");
        return responseData.data;
    } catch (e) {
        console.log(e);
        alert("Ucapan tidak terkirim.");
    }
}

Aksi.getGreeting = async () => {
    try {
        const responseData = await axios.get(baseUrl + '/api/greeting');
        console.log(responseData.response);
        return responseData.data;
    } catch (e) {
        console.log(e);
        alert("Gagal dapat data.");
        return [];
    }
}

Aksi.playSong = () => {
    document.getElementById('song').play();
}

Aksi.pauseSong = () => {
    document.getElementById('song').pause();
}

Aksi.welcomeModal = () => {
    return {
        showModal: false,
        welcomeName: 'Tamu Undangan',
        initData() {
            this.showModal = true;
            this.welcomeName = this.getGuestName()
        },

        getGuestName() {
            const urlParams = new URLSearchParams(window.location.search);
            let myParam = urlParams.get('to');
            if(! myParam) {
                myParam = 'Tamu Undangan'
            }
            return myParam;
        }
    }
}

Aksi.greetingData = () => {
    return {
        greetings: [],
        activeGreeting: 0,
        isLoading: false,
        fieldName: '',
        fieldMsg: '',
        intervalGreeting: null,
        initGreeting: async function() {
            this.greetings = await Aksi.getGreeting();
            this.autoPlayGreeting();
        },
        doNext: function() {
            this.activeGreeting = this.activeGreeting === (this.greetings.length - 1) ? 0 : this.activeGreeting + 1;
            // this.$refs.slider.scrollLeft = this.$refs.slider.scrollLeft + (this.$refs.slider.scrollWidth / this.greetings.length)
            // console.log(this.greetings.length, this.activeGreeting);
        },
        doPrev: function() {
            this.activeGreeting = this.activeGreeting === 0 ? this.greetings.length - 1 : this.activeGreeting - 1;
            // this.$refs.slider.scrollLeft = this.$refs.slider.scrollLeft - (this.$refs.slider.scrollWidth / this.greetings.length)
            // console.log(this.activeGreeting);
        },
        getActiveGreeting() {
            return this.greetings[this.activeGreeting];
        },
        postGreeting: async function () {
            const greeting = await Aksi.postGreeting(this.fieldName, this.fieldMsg);
            this.greetings.unshift(greeting);
            this.activeGreeting = 0;

            // reset form
            this.fieldName = '';
            this.fieldMsg = '';
        },
        autoPlayGreeting: function() {
            const self = this;
            this.intervalGreeting = setInterval(function() {
                self.doNext();
            }, 3000);
        },
    }
}

Aksi.galleryPhotos = () => {
    return {
        galleries: [],
        activeGallery: 1,
        initData() {
            let photos = [
                // 'a',
                // 'b',
                // 'c',
                // 'd',
                // 'e',
                'f',
                'g',
                'h',
                'i',
                'j',
                // 'k',
                'l'
            ];
            photos = photos.map((item) => baseUrl + '/photos/' + item + '.jpg');
            this.galleries = photos;
        },
        doPrev() {
            this.activeGallery = this.activeGallery === 0 ? this.galleries.length - 1 : this.activeGallery - 1;
        },
        doNext() {
            this.activeGallery = this.activeGallery === this.galleries.length - 1 ? 0 : this.activeGallery + 1
        }

    }
}


// $(document).ready jquery equivalent
document.addEventListener("DOMContentLoaded", function(event) {
    var scroll = new SmoothScroll('a[href*="#"]');
});
