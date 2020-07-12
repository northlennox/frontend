import React from 'react';
import './WelcomeComponent.css';
import { Link } from 'react-router-dom';
import Nav from '../Nav';

const WelcomeComponent = (props) => {
  return (
    <div>
      <Nav />
      <div style={{fontFamily: 'Muli', marginLeft: '257px', marginRight: '260px', marginTop: '52px'}}>
        <div style={{fontSize:'28px'}}>Dear Homeowner</div>
        <div>Electricasa is for you.</div>
        <div>Climate change is an urgent threat brought about by carbon emissions from the combustion of oil and gas. The carbon footprint of an average American is 16 tons per year, as compared to 6 tons per year in the UK and 2 tons in India.</div>
        <div> Buildings are responsible for approximately 40% of emissions. The carbon footprint for an average single-family home is 5 tons per year. As a homeowner, you can take action to reduce your carbon footprint. In many states, the supply of electricity is on track to be 100% renewable. That means when you change your equipment and appliances in your home to run on electricity, you are reducing your carbon footprint. The science of climate change requires zero emissions, and all the tools required to achieve zero emissions in houses exist today.</div>
        <div> Electricasa provides you with the evaluation, recommendations and planning you need to make the transition and improve the comfort and sustainability of your home. In addition to lowering your carbon footprint, energy improvements can also increase comfort, health and safety.</div>
        <div style={{fontWeight:'bold'}}> No more gas. Electricasa!</div>
      </div>
    </div>
  )
}

export default WelcomeComponent
