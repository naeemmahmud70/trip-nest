import { getDayDifference } from "@/utils/data-util";
import { sendEmail } from "./sendEmail";

export async function sendBookingConfirmation(
  hotelId,
  hotelName,
  userId,
  checkin,
  checkout,
  amount,
  name,
  email
) {

  const checkinDate = new Date(checkin).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const checkoutDate = new Date(checkout).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const days = getDayDifference(checkin, checkout);

  const userHtmlContent = `
    <h2>Hi ${name},</h2>
    <p>Thank you for your booking! 🎉</p>
    <p>Your reservation has been confirmed.</p>
    
    <p><strong>Booking Details:</strong></p>
    <ul>
      <li><b>Hotel:</b> ${hotelName}</li>
      <li><b>Check-in:</b> ${checkinDate}</li>
      <li><b>Check-out:</b> ${checkoutDate}</li>
      <li><b>Number of Days:</b> ${days}</li>
      <li><b>Total Amount:</b> $${amount}</li>
    </ul>

    <p><strong>Important Information:</strong></p>
    <ul>
      <li>Check-in time: 3:00 PM</li>
      <li>Check-out time: 11:00 AM</li>
      <li>Please bring a valid ID and payment method</li>
    </ul>

    <p>We look forward to welcoming you! 🏨</p>
    <p>If you have any questions, feel free to contact us.</p>
    <p>Safe travels! ✈️</p>
    <p>- TripNest Team</p>
  `;

  const adminHtmlContent = `
    <h2>New Booking Received 🎉</h2>
    <p>A new reservation has been made.</p>
    
    <p><strong>Booking Details:</strong></p>
    <ul>
      <li><b>Hotel:</b> ${hotelName}</li>
      <li><b>Hotel ID:</b> ${hotelId}</li>
      <li><b>Check-in:</b> ${checkinDate}</li>
      <li><b>Check-out:</b> ${checkoutDate}</li>
      <li><b>Number of Days:</b> ${days}</li>
      <li><b>Total Amount:</b> $${amount}</li>
    </ul>

    <p><strong>Guest Information:</strong></p>
    <ul>
      <li><b>Name:</b> ${name}</li>
      <li><b>Email:</b> ${email}</li>
      <li><b>User ID:</b> ${userId}</li>
    </ul>

    <p>Please ensure the room is prepared for the guest's arrival.</p>
    <p>- TripNest Team</p>
  `;

  try {
    // Send email to user
    await sendEmail(
      email,
      `✅ Booking Confirmed – ${hotelName}`,
      userHtmlContent
    );

    // Send email to admin
    await sendEmail(
      "admin@hotelbooking.com",
      `🛎️ New Booking – ${name} at ${hotelName}`,
      adminHtmlContent
    );

    console.log("Booking confirmation emails sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
}
