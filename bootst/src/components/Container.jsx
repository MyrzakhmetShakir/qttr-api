import React, { useEffect, useState } from 'react';

function Container() {

    const [loader, setLoader] = useState(false);
    const [numRandom, setNumRandom] = useState(0);
    const [quote, setQuote] = useState({
        text: "We do what we do because we believe.",
        author: "Anonymous"
    })
    
    useEffect(()=>{
        const controller = new AbortController();
        setLoader(false);
        async function fetchData() {
            try {
            const qq = await fetch('https://quoter-api.onrender.com/all', {signal: controller.signal});
            const q = await qq.json();
            if(qq.ok) {
               setQuote(()=>{
                return {
                    text: q[numRandom].text,
                    author:q[numRandom].author
                }
               })
           
            setLoader(true);
            }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
        return ()=> {controller.abort();}
        }, [numRandom])
    
    
    function getRandom() {
        let random =  Math.floor(Math.random() * 50)
        setNumRandom(random)
      
    }

    function tweetInTwitter() {
        const twitUrl = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`;
        window.open(twitUrl, '_blank')
    }

 
    return <div>
        {!loader ? <div className='lds-dual-ring' id = 'loader'></div> :
        <div className='container' id='container'>
            <div className="sub container1">
                <i className="fa-solid fa-quote-left"></i>
                <span className='title-quote'> {quote.text}</span>
             </div> 
             <div className="sub container2">
                 <span className='title-author'><em>{quote.author}</em></span>
             </div>
             <div className="sub container3">
                 <button onClick = {tweetInTwitter} className='button btn1' title = "Twit this" type = "button"><i className="fa-brands fa-twitter"></i></button>
                 <button onClick = {getRandom} className='button btn2' title = "Random quote" type = "button">New Quote</button>
             </div>
            </div>}
    </div>
    
}


export default Container;