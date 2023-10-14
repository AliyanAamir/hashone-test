To run this project  simply make a env file with the following variables



JWT_SECRET = #any secret
JWT_EXPIRE = #expire time
MONGODB_URI = # link to your mongodb database
ROOT_USER = # email by which you want to send email for activation
ROOT_PASS = # generate app exclusive password for the above email and then put it here



Api urls:

All are post reqs


http://localhost:3000/auth/signup  
http://localhost:3000/auth/login
http://localhost:3000/auth/forgot-password
http://localhost:3000/auth/reset-password


SIGNUP:
after signin up you will recieve an email, without activating that you wouldnt be able to login.

FORGOT_PASSWORD:
forgot password takes body in the following form:
{
  "email": "xyzemail" # must be registered
}


RESET_PASSWORD:
you will recieve a link on your email after forgot password, make sure to copy that link and put it in the url.

reset password body contains :


{
  "resetToken": "" #same token here too,
  "newPassword": "" # new password to be set for the user.
}

