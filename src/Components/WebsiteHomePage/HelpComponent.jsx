import React from 'react'
import "../../Style/WebsiteHomePageStyle/Help.css"
import img from "../../ImagesAndLogo/Team.jpg";

const HelpComponent = () => {
    return (
        <div className='body-help'>
            <div className="help-container1">
                <div className="Help1">
                    <h2 className="Help-h1">Contact Details</h2>
                    For new Admin Registration or To get a new password, Contact on Email Provided below:<br />
                    (If you want to get a new password kindly write Name, Email and UserName in mail box and wait for 24 hours for password. 
                   <span className='contact-note'> Please contact us only by using Gmail id that you have given us during  admin registration. </span>
                    )
                    <p>mohammadmehdi9721@gmail.com <br />
                        {/* natavesujata@gmail.com<br />
                        dwarkeshvirkhare@gmail.com<br />
                        shubham.pokale2001@gmail.com  */}
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
