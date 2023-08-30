export const successful_registration_text = (name: string, token: number) => {
  return `Hi ${name},
Congratulations! Your account has been created. You are almost there. Complete the final step by verifying your email at: ${
    process.env.CLIENT_URL + `/email/verify?token=${token}`
  }
Don't hesitate to contact us if you face any problems.

Regards,
Noolag Team
`;
};

export const successful_registration_html = (name: string, token: number) => `
<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;">
  <h4><strong>Hi ${name},</strong></h4>
  <p>Congratulations! Your account has been created.</p>
  <p>You are almost there. Complete the final step by verifying your email at: ${process.env.CLIENT_URL + `/email/verify?token=${token}`}</p>
  <p>Don't hesitate to contact us if you face any problems.</p>
  <p>Regards,</p>
  <p><strong>Noolag Team</strong></p>
</div>
`;

export const verified_email_text = (name: string) => `Hi ${name},
  Congratulations! Your account has been verified successfully. 
  You can now login at: ${process.env.CLIENT_URL + '/auth/login'}
  Don't hesitate to contact us if you face any problems
  Regards,
  Noolag Team`;

export const verified_email_html = (name: string) => `
<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;">
  <h4><strong>Hi ${name},</strong></h4>
  <p>Congratulations! Your account has been created successfully.</p>
  <p>You can now login at: ${process.env.CLIENT_URL + '/auth/login'}</p>
  <p>Don't hesitate to contact us if you face any problems</p>
  <p>Regards,</p>
  <p><strong>Noolag Team</strong></p></div>`;

export const password_reset_text = (token: number) => `Hi,
  To reset your password, click on this link: ${process.env.CLIENT_URL}/reset-password?token=${token}
  If you did not request any password resets, then ignore this email.`;

export const password_reset_html = (
  token: number,
) => `<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;"><h4><strong>Dear user,</strong></h4>
  <p>To reset your password, click on this link: ${process.env.CLIENT_URL}/reset-password?token=${token}</p>
  <p>If you did not request any password resets, please ignore this email.</p>
  <p>Thanks,</p>
  <p><strong>Noolag Team</strong></p></div>`;

export const successful_password_reset_text = (name: string) => `Hi ${name},
  Your password reset request is successfully. 
  Proceed to login at: ${process.env.CLIENT_URL + '/auth/login'} with your new password.
  Don't hesitate to contact us if you face any problems
  Regards,
  Noolag Team`;

export const successful_password_reset_html = (
  name: string,
) => `<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;"><h4><strong>Hi ${name},</strong></h4>
  <p>Your password reset request is successfully.</p>
  <p>Proceed to login at: ${process.env.CLIENT_URL + '/auth/login'} with your new password.</p>
  <p>Don't hesitate to contact us if you face any problems.</p>
  <p>Regards,</p>
  <p><strong>Noolag Team</strong></p></div>`;
