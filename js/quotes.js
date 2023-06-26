const quotes=[
    {
        quote:"The mark of the immature man is that he wants to die nobly for a cause, while the mark of the mature man is that he wants to live humbly for one.",
        author:"Wilhelm Stekel",
    },
    {
        quote:"I'd rather be optimistic and wrong than pessimistic and right.",
        author:"Elon Musk",
    },
    {
        quote:"ZERO TO ONE EVERY MOMENT IN BUSINESS happens only once. The next Bill Gates will not build an operating system. The next Larry Page or Sergey Brin won’t make a search engine. And the next Mark Zuckerberg won’t create a social network. If you are copying these guys, you aren’t learning from them.",
        author:"Peter Thiel",
    },
    {
        quote:"Once you’re 10x better, you escape competition.",
        author:"Peter Thiel",
    },
    {
        quote:"The more we regard our success as our own doing, the less responsibility we feel for those who fall behind.",
        author:"Michael Sandel",
    },
    {
        quote:"In an unequal society, those who land on top want to believe their success is morally justified. In a meritocratic society, this means the winners must believe they have earned their success through their own talent and hard work.",
        author:"Michael Sandel",
    },
    {
        quote:"Only nuclear, not solar and wind, can provide abundant, reliable, and inexpensive heat.",
        author:"Michael Shellenberger",
    },
    {
        quote:"The artificial things are as natural as the natural things.",
        author:"Michael Shellenberger",
    },
    {
        quote:"You cannot know where your people are going if you don't know where your people have been.",
        author:"Forrest Carter",
    },
    {
        quote:"And, when you want something, all the universe conspires in helping you to achieve it.",
        author:"Paulo Coelho",
    },
    {
        quote:"One is loved because one is loved. No reason is needed for loving.",
        author:"Paulo Coelho",
    },
    {
        quote:"When I had nothing to lose, I had everything. When I stopped being who I am, I found myself.",
        author:"Paulo Coelho",
    },
    {
        quote:"Stay hungry. Stay foolish.",
        author:"Steve Jobs",
    },
    {
        quote:"In nature nothing exists alone.",
        author:"Rachel Carson",
    },
    {
        quote:"If I have seen further it is by standing on the shoulders of Giants.",
        author:"Isaac Newton",
    },
    {
        quote:"One, remember to look up at the stars and not down at your feet. Two, never give up work. Work gives you meaning and purpose and life is empty without it. Three, if you are lucky enough to find love, remember it is there and don't throw it away",
        author:"Stephen Hawking",
    },
    {
        quote:"If you judge people, you have no time to love them.",
        author:"Mother Teresa",
    },
    {
        quote:"Everything you can imagine is real.",
        author:"Pablo Picasso",
    },
    {
        quote:"If anything is certain, it is that I myself am not a Marxist.",
        author:"Karl Marx",
    },
    {
        quote:"Humans are allergic to change. They love to say, 'We've always done it this way.' I try to fight that. That's why I have a clock on my wall that runs counter-clockwise.",
        author:"Grace Hopper",
    },
    {
        quote:"Sometimes it is the people no one can imagine anything of who do the things no one can imagine.",
        author:"Alan Turing",
    },
    {
        quote:"I have not failed. I've just found 10,000 ways that won't work.",
        author:"Thomas A. Edison",
    },
    {
        quote:"When I was a kid, I was always going to bed creating a story and that was the birth of filmmaking for me. I would like going to the dream-state by telling the story to someone else in my mind. That was my imaginary friend; it was an imaginary audience listening to my story.",
        author:"Denis Villeneuve",
    },
]

const quote=document.querySelector("#quote-container span:first-child");
const author=document.querySelector("#quote-container span:last-child");

const randomQuote=quotes[Math.floor(Math.random()*quotes.length)]//Math.floor()==내림

quote.innerText=`"${randomQuote.quote}"`;
author.innerText=randomQuote.author;