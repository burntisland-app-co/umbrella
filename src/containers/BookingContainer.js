import React, { Component } from 'react'
import BookingList from '../components/bookingcomponents/BookingList'
import BookingDetail from '../components/bookingcomponents/BookingDetail'
import NewBookingForm from '../components/bookingcomponents/NewBookingForm'
import TextField from '@material-ui/core/TextField'

class BookingContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookings: [],
      customers: [],
      seatings: [],
      selectedBooking: null,
      searchDate: "",
      totalCovers: ""
    }
    this.handleBookingSubmit = this.handleBookingSubmit.bind(this)
    this.handleBookingSelected = this.handleBookingSelected.bind(this)
    this.handleDateSelected = this.handleDateSelected.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:8080/customers')
      .then(res => res.json())
      .then(data => this.setState({ customers: data._embedded.customers }))

    fetch('http://localhost:8080/seatings')
      .then(res => res.json())
      .then(data => this.setState({ seatings: data._embedded.seatings }))

    fetch('http://localhost:8080/bookings')
      .then(res => res.json())
      .then(data => this.setState({ bookings: data._embedded.bookings }))
  }

  handleBookingSelected(index) {
    const booking = this.state.bookings[index]
    fetch(`http://localhost:8080/bookings/${booking.id}`)
      .then(res => res.json())
      .then(data => this.setState({ selectedBooking: data }))
  }

  handleBookingSubmit(booking) {
    fetch('http://localhost:8080/bookings')
      .then(res => res.json())
      .then(data => this.setState({ bookings: data._embedded.bookings }))
  }

  handleDateSelected(event) {
    this.setState({ searchDate: event.target.value })
  }

  getTotalNumberOfCovers() {
    const searchDate = this.state.searchDate
    const foundBookings = this.state.bookings.filter(booking => booking.date === searchDate)
    const seatsbookedArray = foundBookings.map((foundBooking) => { return foundBooking.partySize })
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const totalNumberOfCovers = seatsbookedArray.reduce(reducer, 0)
    const totalCapacity = 26
    const availableSeats = totalCapacity - totalNumberOfCovers
    return availableSeats;
  }

  render() {
    const searchDate = this.state.searchDate
    const foundBookings = this.state.bookings.filter(booking => booking.date === searchDate)
    const foundBookingsItems = foundBookings.map((foundBooking) => { return <li key="index">{foundBooking._embedded.customer.name}: {foundBooking.time}</li> })



      return(
            
            <div className="booking-container">
              <div className="new-booking">
              <h3>New Booking</h3>

            <NewBookingForm
            onBookingSubmit={this.handleBookingSubmit}
            customers={this.state.customers}
            seatings={ this.state.seatings}
            />
            </div>

            <div className="view-booking">
            <h3>Find Bookings By Name</h3>
            <BookingList
            bookings={this.state.bookings}
            fullWidth={true}
            onBookingSelected={this.handleBookingSelected}
            />
            </div>

            <div className="view-booking">
            <BookingDetail
            booking={this.state.selectedBooking}
            onBookingSubmit={this.handleBookingSubmit}
            customers={this.state.customers}
            seatings={ this.state.seatings}
            />
            </div>


            <div className="view-booking">
            <h3>Find Bookings By Date</h3>
            <TextField
            fullWidth={true}
            type="date"
            onChange={this.handleDateSelected}
            />
            
          <ul>
            {foundBookingsItems}
          </ul></div>
          <div className="view-booking">
            <h3>Available seats for selected day : {this.getTotalNumberOfCovers()}
          </h3></div>
          </div>
      )
  }
}

export default BookingContainer
