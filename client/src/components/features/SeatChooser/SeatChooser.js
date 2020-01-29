import React from 'react';
import io from 'socket.io-client';
import { Button, Progress, Alert } from 'reactstrap';

import './SeatChooser.scss';

class SeatChooser extends React.Component {
  componentDidMount() {
    this.socket = io(process.env.NODE_ENV);

    const { loadSeats } = this.props;
    this.socket.on('seatsUpdated', seats => this.props.loadSeatsData(seats));
    loadSeats();
  }

  isTaken = seatId => {
    const { seats, chosenDay } = this.props;
    return seats.some(item => item.seat === seatId && item.day === chosenDay);
  };

  prepareSeat = seatId => {
    const { chosenSeat, updateSeat } = this.props;
    const { isTaken } = this;

    if (seatId === chosenSeat)
      return (
        <Button key={seatId} className='seats__seat' color='primary'>
          {seatId}
        </Button>
      );
    else if (isTaken(seatId))
      return (
        <Button key={seatId} className='seats__seat' disabled color='secondary'>
          {seatId}
        </Button>
      );
    else
      return (
        <Button
          key={seatId}
          color='primary'
          className='seats__seat'
          outline
          onClick={e => updateSeat(e, seatId)}>
          {seatId}
        </Button>
      );
  };

  countSeats = number => {
    const { chosenDay, seats } = this.props;
    const dayArray = [];
    switch (chosenDay) {
      case 1:
        for (let seat of seats) {
          if (seat.day === chosenDay) {
            dayArray.push(seat);
          }
        }
        break;
      case 2:
        for (let seat of seats) {
          if (seat.day === chosenDay) {
            dayArray.push(seat);
          }
        }
        break;
      case 3:
        for (let seat of seats) {
          if (seat.day === chosenDay) {
            dayArray.push(seat);
          }
        }
        break;
    }

    return number - dayArray.length;
  };

  render() {
    const { prepareSeat, countSeats } = this;
    const { requests } = this.props;
    const numberOfSeats = 50;

    return (
      <div>
        <h3>Pick a seat</h3>
        <small id='pickHelp' className='form-text text-muted ml-2'>
          <Button color='secondary' /> – seat is already taken
        </small>
        <small id='pickHelpTwo' className='form-text text-muted ml-2 mb-4'>
          <Button outline color='primary' /> – it's empty
        </small>
        {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success && (
          <div className='seats'>
            {[...Array(numberOfSeats)].map((x, i) => prepareSeat(i + 1))}
          </div>
        )}
        {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending && (
          <Progress animated color='primary' value={50} />
        )}
        {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error && (
          <Alert color='warning'>Couldn't load seats...</Alert>
        )}
        <h5>
          Free Seats: {countSeats(numberOfSeats)}/{numberOfSeats}
        </h5>
      </div>
    );
  }
}

export default SeatChooser;
