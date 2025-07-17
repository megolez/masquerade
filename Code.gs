function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById('18RuPNgCnpWbXZ_CHMLgdEa08-938Efp51Oi26pLlDu4');
    const worksheet = sheet.getActiveSheet();
    
    // Get form data
    const firstName = e.parameter.firstName;
    const lastName = e.parameter.lastName;
    const email = e.parameter.email;
    
    // Add row with timestamp, firstName, lastName, email
    worksheet.appendRow([
      new Date(),
      firstName,
      lastName,
      email
    ]);
    
    return ContentService
      .createTextOutput('Success')
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    return ContentService
      .createTextOutput('Error: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function testEmail() {
  MailApp.sendEmail({
    to: 'your-email@gmail.com', // Replace with your actual email
    subject: 'Test Email from Apps Script',
    body: 'This is a test email. If you receive this, email sending is working!'
  });
}

function sendConfirmationEmail(e) {
  var sheet = e.source.getActiveSheet();
  var row = e.range.getRow();

  var firstName = sheet.getRange(row, 2).getValue();  // Column B = firstName
  var lastName = sheet.getRange(row, 3).getValue();   // Column C = lastName  
  var email = sheet.getRange(row, 4).getValue();      // Column D = email

  if (!email || !firstName) return;

  var name = firstName + ' ' + lastName;  // Combine first and last name

  var subject = "Confirmed for Masqueroyale";

  var imageUrl = "https://imgur.com/a/Xi9ZMms";

  var body = 
    '<div style="font-family:Helvetica, sans-serif; font-size:15px; color:#111;">' +
    '<img src="' + imageUrl + '" style="width:100%; max-width:600px; border-radius:8px; margin-bottom:20px;"><br>' +
    'Hi ' + firstName + ',<br><br>' +
    "You're on the list for <strong>Masqueroyale</strong>, a masquerade–Casino Royale mashup celebration at <em>Reverb</em> in San Francisco.<br><br>" +
    "Champagne and mini casino games <strong>9–10PM,</strong> DJ set follows.<br><br>" +
    "Friends are more than welcome, but must RSVP.<br>" +
    "Dress to impress.<br><br>" +
    "xx,<br>M" +
    '</div>';

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body
  });
}
