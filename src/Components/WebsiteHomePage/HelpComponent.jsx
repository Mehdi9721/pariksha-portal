import React from 'react'
import "../../Style/WebsiteHomePageStyle/Help.css"
import img from "../../ImagesAndLogo/Team.jpg";

const HelpComponent = () => {
    return (
        <div className='body'>
            <div className="help-container1">
                <div className="Help1">
                    <h1 className="Help-h1">Contact Details</h1>
                    
                    For Admin Registration Contact on Email Provided below:<br />
                    <p>mohammadmehdi9721@gmail.com <br />
                        natavesujata@gmail.com<br />
                        dwarkeshvirkhare@gmail.com<br />
                        shubham.pokale2001@gmail.com 
                        </p>

                    <div className='img11'>
                        {/* <img src={img} className='img' /> */}
                        <div className="copyright">
                            &copy; Crafted By 2SD
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HelpComponent
