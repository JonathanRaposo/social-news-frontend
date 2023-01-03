import { AuthContext } from '../context/auth.context';
import newFeeds from '../assets/images/new-feed.png'
import tv from '../assets/images/tv.png';
import { useContext } from 'react'

const AboutPage = () => {
    const { theme } = useContext(AuthContext);

    return (
        <div className={"AboutPage " + theme}>

            <div className="hero">

                <h2 className={"about-heading " + theme}>About</h2>
            </div>
            <div className="feature-wrapper">

                <div className="photo-wrapper">
                    <img src={tv} alt="television" />
                </div>

                <div className={"para-wrapper " + theme} >
                    <h2>Keep the articles you save permanently </h2>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate architecto labore deleniti,quo,distinctio consectetur facere culpa temporibus nulla sit sapiente dolores corrupti minima voluptates aliquiaperiamfugiat voluptatum error. Eius aliquam consequatur aperiam, esse sed nihil ipsam cum perferendis quas oditobcaecatirem incidunt eaque? A, quas nobis. Quibusdam dolor, iure expedita adipisci, fugit eum atque praesentium deleniti
                        aliquam, minima eos rerum! Alias, dicta hic placeat laudantium, consectetur id repudiandae voluptatum.</p>
                </div>




            </div>


            <div className="feature-wrapper">


                <div className="para-wrapper newfeed">
                    <h2>Get the stories that you're interested in </h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate architecto labore deleniti,quo,distinctio consectetur facere culpa temporibus nulla sit sapiente dolores corrupti minima voluptates aliquiaperiamfugiat voluptatum error. Eius aliquam consequatur aperiam, esse sed nihil ipsam cum perferendis quas oditobcaecatirem incidunt eaque? A, quas nobis. Quibusdam dolor, iure expedita adipisci, fugit eum atque praesentium deleniti
                        aliquam, minima eos rerum! Alias, dicta hic placeat laudantium, consectetur id repudiandae voluptatum.</p>
                </div>
                <div className="photo-wrapper">
                    <img src={newFeeds} alt="new feed" />
                </div>




            </div>


        </div>
    )
}

export default AboutPage;