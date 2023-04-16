Author: Jameson Yeo
Student ID: 20104906

# CabOnline

The goal of this project is to improve your knowledge of online 
application development utilising simple Ajax techniques, PHP, and MySQL.

## Files
- Booking page:
    - booking.html
    - booking.js
    - booking.php
- admin page:
    - admin.html
    - admin.js
    - admin.php
- mysqlcommands.txt
- readme.md


# Instruction
- User
The user may book through the booking website (booking.html), where they will enter information such as their name, phone number, street number, street name, and pick-up date/time.
The user may also enter their unit number, the suburb they are now in, and the destination for their suburb.
Once the user submits, the confirmation information will be displayed at the bottom of the screen, including the Booking Reference Number and Pick-UP Date/Time.

- Admin
The admin may be accessed via the admin page (admin.html).
When the admin searches blank, it displays the customers' bookings that are within a 2-hour range of their pickup time and have the status unassigned.
They may also look for a specific Booking Reference Number by entering 'BRN' followed by 5 digits.

The admin can also assign a driver for the client, which has a state of unassigned and, if clicked, will assign a driver to the customer who cannot be assigned another driver.