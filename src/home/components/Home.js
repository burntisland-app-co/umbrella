import React from 'react';
import Button from '@material-ui/core/Button';

const Home = () => (
    <div className="homeContainer">
        <div id="home-pic-and_btn">
          <h4 className="header">Hi there! Welcome to Godfreya's! Bye There!</h4>
          <Button id="home-reservation-btn"
            variant="contained"
            color="secondary"
            type="submit"
            >
            <a href="/bookings">
            Make a reservation
            </a>
          </Button>
          <div id="home-images">
            {/* <img className="bottom" alt="interior restaurant" src="http://3.bp.blogspot.com/-zF7_8YHOOT4/VSFOSWHwukI/AAAAAAAADeE/wdbDbs6JbRg/s1600/19.jpg" /> */}
            <img className="top" alt="cosy seating area" src="https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F849c6304-a462-11e7-afbf-91c225a59917.jpg?crop=2667%2C1500%2C0%2C0&resize=1200" />
          </div>
          
        </div>
    </div>
)


export default Home;
