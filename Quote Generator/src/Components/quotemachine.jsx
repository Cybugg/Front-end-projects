import React, { useReducer } from "react";

// preset initial state containing Quotes

const quotes = [
    {id:923467 ,quote:"“The purpose of our lives is to be happy.”",
    author:"Dalai Lama"},
    {id:923456 ,quote:"“Life is what happens when you’re busy making other plans.”",
    author:"John Lennon"},
    {id:92367 ,quote:" “Get busy living or get busy dying.”",
    author:"Stephen King"},
    {id:9230 ,quote:"“You only live once, but if you do it right, once is enough.”",
    author:"Mae West"},
    {id:9232 ,quote:"“Many of life’s failures are people who did not realize how close they were to success when they gave up.”",
    author:"Thomas A. Edison"},
    {id:9233 ,quote:"“If you want to live a happy life, tie it to a goal, not to people or things.”",
    author:"Albert Einstein"},
    {id:9234 ,quote:"“Never let the fear of striking out keep you from playing the game.”",
    author:"Babe Ruth"},
    {id:9235 ,quote:" “Money and success don’t change people; they merely amplify what is already there.”",
    author:"Will Smith"},
    {id:9236 ,quote:"“Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking.”",
    author:"Steve Jobs"},
    {id:9237 ,quote:"“Not how long, but how well you have lived is the main thing.”",
    author:"Seneca"},
    {id:92370 ,quote:"“If life were predictable it would cease to be life, and be without flavor.”",
    author:"Eleanor Roosevelt"},
    {id:92371 ,quote:" “The whole secret of a successful life is to find out what is one’s destiny to do, and then do it.”",
    // 
    author:"Henry Ford"},
    {id:92372 ,quote:"“In order to write about life first you must live it.”",
    author:"Ernest Hemingway"},
    {id:92373 ,quote:"“The big lesson in life, baby, is never be scared of anyone or anything.”",
    author:"Frank Sinatra"},
    {id:92374 ,quote:"“Curiosity about life in all of its aspects, I think, is still the secret of great creative people.”",
    author:"Leo Burnett"},
    {id:92375 ,quote:"“Life is not a problem to be solved, but a reality to be experienced.”",
    author:"Soren Kierkegaard"},
    {id:92376 ,quote:"“The unexamined life is not worth living.”",
    author:"Socrates"},
    {id:92377 ,quote:"“Turn your wounds into wisdom.”",
    author:"Oprah Winfrey"},
    {id:873340 ,quote:"“The way I see it, if you want the rainbow, you gotta put up with the rain.” —Dolly Parton",
    author:"Dolly Parton"},
    {id:6743333 ,quote:"“Do all the good you can, for all the people you can, in all the ways you can, as long as you can.”",
    author:"Hillary Clinton (inspired by John Wesley )"},
    {id:94456 ,quote:"“Don’t settle for what life gives you; make life better and build something.”",
    author:"Ashton Kutcher"},
    {id:55534 ,quote:"“Everybody wants to be famous, but nobody wants to do the work. I live by that. You grind hard so you can play hard. At the end of the day, you put all the work in, and eventually it’ll pay off. It could be in a year, it could be in 30 years. Eventually, your hard work will pay off.”",
    author:"Kevin Hart"},
    {id:66773 ,quote:"“Everything negative – pressure, challenges – is all an opportunity for me to rise.”",
    author:"Kobe bryant"},
    {id:75554 ,quote:"“I like criticism. It makes you strong.”",
    author:"LeBron James"},
    // 
    {id:8723453 ,quote:"“You never really learn much from hearing yourself speak.”",
    author:"Dalai Lama"},
    {id:673434 ,quote:"“Life imposes things on you that you can’t control, but you still have the choice of how you’re going to live through this.”",
    author:"Celine Dion"},
    {id:9123322 ,quote:"“Life is never easy. There is work to be done and obligations to be met – obligations to truth, to justice, and to liberty.”",
    author:"John F. Kennedy (JFK Quotes)"},
    {id:12332 ,quote:"“Live for each second without hesitation.”",
    author:"Elton John"},
    {id:22453 ,quote:"“Life is like riding a bicycle. To keep your balance, you must keep moving.”",
    author:"Albert Einstein"},
    {id:221123 ,quote:"“Life is really simple, but men insist on making it complicated.”",
    author:"Confucius"},
    {id:228765 ,quote:"“Life is a succession of lessons which must be lived to be understood.”",
    author:"Helen Keller"},
    {id:223454 ,quote:"“Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven’t found it yet, keep looking. Don’t settle. As with all matters of the heart, you’ll know when you find it.”",
    author:"Steve Jobs"},
    {id:22631 ,quote:"“My mama always said, life is like a box of chocolates. You never know what you’re gonna get.”",
    author:"Forrest Gump (Forrest Gump Quotes)"},
    {id:223344 ,quote:"“Watch your thoughts; they become words. Watch your words; they become actions. Watch your actions; they become habits. Watch your habits; they become character. Watch your character; it becomes your destiny.”",
    author:"Lao-Tze"},
    {id:229874 ,quote:"“When we do the best we can, we never know what miracle is wrought in our life or the life of another.”",
    author:"Helen Keller"},
    {id:22354654 ,quote:"“The healthiest response to life is joy.”",
    author:"Deepak Chopra"},
    {id:22342 ,quote:"“Life is like a coin. You can spend it any way you wish, but you only spend it once.”",
    author:"Lillian Dickson"},
    {id:22232 ,quote:"“The best portion of a good man’s life is his little nameless, unencumbered acts of kindness and of love.”",
    author:"Wordsworth"},
    {id:221123 ,quote:"“In three words I can sum up everything I’ve learned about life: It goes on.” ",
    author:"Robert Frost"},
    {id:221111 ,quote:"“Life is ten percent what happens to you and ninety percent how you respond to it.”",
    author:"Charles Swindoll"},
    {id:225555 ,quote:"“Keep calm and carry on.”",
    author:"Dalai Lama"},
    {id:228888 ,quote:"“The purpose of our lives is to be happy.”",
    author:"Winston Churchill"},
    {id:22456666 ,quote:"“Maybe that’s what life is… a wink of the eye and winking stars.”",
    author:"Jack Kerouac"},
    {id:22234444 ,quote:"“Life is a flower of which love is the honey.”",
    author:"Victor Hugo"},
    {id:227634 ,quote:"“Keep smiling, because life is a beautiful thing and there’s so much to smile about.”",
    author:"Marilyn Monroe"},
    {id:2200003 ,quote:"“Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.”",
    author:"Buddha"},
    {id:223456 ,quote:"“You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.”",
    author:"Dr. Seuss"},
    {id:2923932 ,quote:"“Good friends, good books, and a sleepy conscience: this is the ideal life.”",
    author:"Mark Twain"},
    {id:2020342 ,quote:"“Life would be tragic if it weren’t funny.”",
    author:"Stephen Hawking"},
    {id:2935467 ,quote:" “Live in the sunshine, swim the sea, drink the wild air.”",
    author:"Ralph Waldo Emerson"},
]



const ACTIONS = {
    PREVIOUS:"PREVIOUS",
    NEXT:"NEXT"
}



const reducer = (state,{type}) => {
    
    switch(type){
        case ACTIONS.PREVIOUS:
            if(state-1 === -1){
                return quotes.length-1
            }
            return state - 1
        case ACTIONS.NEXT:
            if(state === quotes.length-1){
                return 0
            }
            return state + 1
    }
}

export  default function Quotes(){
    const [state,dispatch] = useReducer(reducer,0)
    // const interval = setInterval(()=>{dispatch({type:"NEXT"})},5000)
    return(
        <div className="pack">
            <h2>{quotes[state]["quote"]}</h2>
            <p>-- {quotes[state]["author"]}</p>
            <button id="nx" onClick={()=>{dispatch({type:"NEXT"})}}>🢂</button>
            <button id="pr" onClick={()=>{dispatch({type:"PREVIOUS"})}}>🢀</button>
        </div>
    )
}