const facts = [
  {
    text: "Young sunflowers actually move to follow the sun across the sky — a behavior called heliotropism. During the day, they turn from east to west, then reset overnight. Once fully grown, most sunflowers settle facing east to greet the morning sun.",
    image: "images/sunflowerfod.png"
  },
  {
    text: "Cherry blossom petals are edible! In Japan, they're pickled in salt and plum vinegar to make sakura tea, often served at weddings to symbolize new beginnings. The petals can also be used in sweets and drinks for a soft floral flavor.",
    image: "images/cherry.png"
  },
  {
    text: "Roses and apples belong to the same plant family, Rosaceae. Rose hips—the fruit of the rose plant—can be used in teas and jams and contain high levels of vitamin C, just like many fruits.",
    image: "images/rosefod.png"
  },
  {
    text: "Lavender is famous for its calming scent. Studies show that lavender oil can help some people feel less anxious and sleep better, which is why it’s used in pillows, candles, teas, and aromatherapy.",
    image: "images/lavenderfod.png"
  },
  {
    text: "During the 1600s in the Netherlands, tulips became so valuable that their bulbs were sold for extremely high prices — a period now known as Tulip Mania. Some bulbs were worth more than a house.",
    image: "images/tulipfod.png"
  },
  {
    text: "Lilies are among the oldest cultivated flowers and symbolize purity and new beginnings. Growing from bulbs that renew each year, their sweet scent and sturdy petals make them beloved across many cultures.",
    image: "images/lilyfod.png"
  }
];

// Choose fact based on the day of the month
const day = new Date().getDate();
const index = day % facts.length;
const todayFact = facts[index];

// Update HTML using DOM manipulation (slides: accessing + modifying DOM)
document.getElementById("fact-text").textContent = todayFact.text;
document.getElementById("left-flower").src = todayFact.image;
document.getElementById("right-flower").src = todayFact.image;
