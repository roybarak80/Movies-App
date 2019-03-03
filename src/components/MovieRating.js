import React, {Component} from 'react'

export default class MovieRating extends Component {

    roundAvarege(prmAverage) {
        var currAvarege = Math.ceil(prmAverage);
        currAvarege = 10 - currAvarege;
        return currAvarege.toString();
    }
    render() {
        var starIcons = [];
        var currAvaregeInt = this.roundAvarege(this.props.currAverage);
        for (var i = 0; i < currAvaregeInt; i++) {
            starIcons.push(
                <span className='ratingStar' key={i}>
                    <i className="fa fa-star"></i>
                </span>
            );
        }

        return (
            <div>
                {starIcons}
            </div>
        )
    }
}
