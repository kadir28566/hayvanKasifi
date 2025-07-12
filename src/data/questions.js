export const animalQuestions = {
  cat: {
    name: 'Kedi',
    image: require('../../assets/animals/cat.png'),
    questions: [
      {
        question: 'Kediler kaç bıyığa sahiptir?',
        options: ['4', '6', '8', '12'],
        correctAnswer: '12'
      },
      {
        question: 'Kediler ne ile beslenir?',
        options: ['Sadece et', 'Sadece ot', 'Hem et hem ot', 'Sadece süt'],
        correctAnswer: 'Hem et hem ot'
      },
      {
        question: 'Kediler günde kaç saat uyur?',
        options: ['8-10 saat', '12-16 saat', '20-22 saat', '4-6 saat'],
        correctAnswer: '12-16 saat'
      }
    ]
  },
  chicken: {
    name: 'Tavuk',
    image: require('../../assets/animals/chicken.png'),
    questions: [
      {
        question: 'Tavuklar hangi hayvan grubuna aittir?',
        options: ['Memeli', 'Kuş', 'Balık', 'Sürüngen'],
        correctAnswer: 'Kuş'
      },
      {
        question: 'Tavuklar ne üretir?',
        options: ['Süt', 'Yumurta', 'Bal', 'İpek'],
        correctAnswer: 'Yumurta'
      },
      {
        question: 'Tavuklar nerede yaşar?',
        options: ['Denizde', 'Karada', 'Ağaçta', 'Mağarada'],
        correctAnswer: 'Karada'
      }
    ]
  },
  dolphin: {
    name: 'Yunus',
    image: require('../../assets/animals/dolphin.png'),
    questions: [
      {
        question: 'Yunuslar hangi hayvan grubuna aittir?',
        options: ['Balık', 'Memeli', 'Sürüngen', 'Kuş'],
        correctAnswer: 'Memeli'
      },
      {
        question: 'Yunuslar nerede yaşar?',
        options: ['Karada', 'Denizde', 'Gölde', 'Nehirde'],
        correctAnswer: 'Denizde'
      },
      {
        question: 'Yunuslar nasıl nefes alır?',
        options: ['Solungaç', 'Akciğer', 'Deri', 'Burun'],
        correctAnswer: 'Akciğer'
      }
    ]
  },
  duck: {
    name: 'Ördek',
    image: require('../../assets/animals/duck.png'),
    questions: [
      {
        question: 'Ördekler hangi hayvan grubuna aittir?',
        options: ['Memeli', 'Kuş', 'Balık', 'Sürüngen'],
        correctAnswer: 'Kuş'
      },
      {
        question: 'Ördekler nerede yaşar?',
        options: ['Karada', 'Su kenarında', 'Ağaçta', 'Mağarada'],
        correctAnswer: 'Su kenarında'
      },
      {
        question: 'Ördekler nasıl yüzer?',
        options: ['Kanatlarıyla', 'Ayaklarıyla', 'Kuyruklarıyla', 'Gagalarıyla'],
        correctAnswer: 'Ayaklarıyla'
      }
    ]
  },
  elephant: {
    name: 'Fil',
    image: require('../../assets/animals/elephant.png'),
    questions: [
      {
        question: 'Fillerin en belirgin özelliği nedir?',
        options: ['Uzun boyun', 'Hortum', 'Kanatlar', 'Kuyruk'],
        correctAnswer: 'Hortum'
      },
      {
        question: 'Filler hangi kıtada yaşar?',
        options: ['Avrupa', 'Asya ve Afrika', 'Amerika', 'Avustralya'],
        correctAnswer: 'Asya ve Afrika'
      },
      {
        question: 'Filler ne ile beslenir?',
        options: ['Et', 'Ot ve yaprak', 'Balık', 'Meyve'],
        correctAnswer: 'Ot ve yaprak'
      }
    ]
  },
  rabbit: {
    name: 'Tavşan',
    image: require('../../assets/animals/rabbit.png'),
    questions: [
      {
        question: 'Tavşanlar hangi hayvan grubuna aittir?',
        options: ['Memeli', 'Kuş', 'Balık', 'Sürüngen'],
        correctAnswer: 'Memeli'
      },
      {
        question: 'Tavşanlar ne ile beslenir?',
        options: ['Et', 'Havuç ve ot', 'Balık', 'Meyve'],
        correctAnswer: 'Havuç ve ot'
      },
      {
        question: 'Tavşanlar nerede yaşar?',
        options: ['Denizde', 'Ağaçta', 'Yeraltında', 'Mağarada'],
        correctAnswer: 'Yeraltında'
      }
    ]
  },
  sheep: {
    name: 'Koyun',
    image: require('../../assets/animals/sheep.png'),
    questions: [
      {
        question: 'Koyunlar hangi hayvan grubuna aittir?',
        options: ['Memeli', 'Kuş', 'Balık', 'Sürüngen'],
        correctAnswer: 'Memeli'
      },
      {
        question: 'Koyunlardan ne elde edilir?',
        options: ['Süt', 'Yün', 'Yumurta', 'Bal'],
        correctAnswer: 'Yün'
      },
      {
        question: 'Koyunlar ne ile beslenir?',
        options: ['Et', 'Ot', 'Meyve', 'Balık'],
        correctAnswer: 'Ot'
      }
    ]
  },
  tiger: {
    name: 'Kaplan',
    image: require('../../assets/animals/tiger.png'),
    questions: [
      {
        question: 'Kaplanlar hangi renkte çizgilere sahiptir?',
        options: ['Siyah', 'Kahverengi', 'Turuncu-siyah', 'Gri'],
        correctAnswer: 'Turuncu-siyah'
      },
      {
        question: 'Kaplanlar nerede yaşar?',
        options: ['Afrika', 'Asya', 'Amerika', 'Avrupa'],
        correctAnswer: 'Asya'
      },
      {
        question: 'Kaplanlar ne ile beslenir?',
        options: ['Ot', 'Meyve', 'Et', 'Balık'],
        correctAnswer: 'Et'
      }
    ]
  },
  zebra: {
    name: 'Zebra',
    image: require('../../assets/animals/zebra.png'),
    questions: [
      {
        question: 'Zebraların en belirgin özelliği nedir?',
        options: ['Uzun boyun', 'Çizgiler', 'Boynuz', 'Kanatlar'],
        correctAnswer: 'Çizgiler'
      },
      {
        question: 'Zebralar hangi kıtada yaşar?',
        options: ['Asya', 'Afrika', 'Amerika', 'Avrupa'],
        correctAnswer: 'Afrika'
      },
      {
        question: 'Zebralar ne ile beslenir?',
        options: ['Et', 'Ot', 'Meyve', 'Balık'],
        correctAnswer: 'Ot'
      }
    ]
  }
};

export const getRandomAnimal = () => {
  const animals = Object.keys(animalQuestions);
  const randomIndex = Math.floor(Math.random() * animals.length);
  return animals[randomIndex];
};

export const getRandomQuestion = (animalKey) => {
  const animal = animalQuestions[animalKey];
  const questions = animal.questions;
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}; 