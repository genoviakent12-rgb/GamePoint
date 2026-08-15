package com.example.demo.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.model.Booking;
import com.example.demo.repository.BookingRepository;

@Service
public class BookingService {
  private final BookingRepository bookingRepository;

  public BookingService(BookingRepository bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  public Iterable<Booking> findAllBookings() {
    return bookingRepository.findAll();
  }

  public Optional<Booking> getBookingById(Long id) {
    return bookingRepository.findById(id);
  }

  public Booking addBooking(Booking booking) {
    booking.setStatus("pending");
    return bookingRepository.save(booking);
  }

  public Booking deleteBooking(Long id) {
    Optional<Booking> bookingOptional = bookingRepository.findById(id);

    if (!bookingOptional.isPresent()) {
      return null;
    }

    Booking bookingToDelete = bookingOptional.get();
    bookingRepository.delete(bookingToDelete);
    return bookingToDelete;
  }
}