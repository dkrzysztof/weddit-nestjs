# TODO - account

## Prerekwizyty

1. Tabela `User`
 - pole `createdAt`,
 - pole `deletedAt` lub pole `isActive`,
 - hashowane hasła,
 - potwierdzenie konta emailem,
 


## Funkcjonalności

1. Get Account Details
```C#
[Produces(typeof(Response<GetAccountDetailsResponse>))]
[HttpGet("details")]
public async Task<IActionResult> GetAccountDetails()
{
    var response = await _accountService.GetAccountDetailsAsync();
    return SendResponse(response);
}
```

2. UpdateAccountDetails 
```C#
[Produces(typeof(Response<UpdateAccountDetailsDtoResponse>))]
[HttpPut("details")]
public async Task<IActionResult> UpdateAccountDetails([FromBody] UpdateAccountDetailsRequest request)
{
    var response = await _accountService.UpdateAccountDetailsAsync(request);
    return SendResponse(response);
}
```
3. Confirm Email
```C#
[AllowAnonymous]
[HttpGet("confirm-email")]
public async Task<IActionResult> ConfirmEmail([FromQuery] string userId, [FromQuery] string confirmationCode)
{
    var response = await _accountService.ConfirmEmailAsync(userId, confirmationCode);
    return SendResponse(response);
}
```

4. Change Password 
```C#
[HttpPost("change-password")]
public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
{
    var response = await _accountService.ChangePasswordAsync(request);
    return SendResponse(response);
}
```
5. Forgot Password 
```C#
[AllowAnonymous]
[HttpPost("forgot-password")]
public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
{
    var response = await _accountService.ForgotPasswordAsync(request);
    return SendResponse(response);
}
```

6. Reset Password 
```C#
[AllowAnonymous]
[HttpPost("reset-password")]
public async Task<IActionResult> ResetPassword([FromQuery] string userId, [FromQuery] string passwordResetCode,
    [FromBody] ResetPasswordRequest request)
{
    var response = await _accountService.ResetPasswordAsync(userId, passwordResetCode, request);
    return SendResponse(response);
}
```

7. Resend Confirmation Email 
```C#
[AllowAnonymous]
[HttpPost("resend-confirmation-email")]
public async Task<IActionResult> ResendConfirmationEmail([FromBody] ResendConfirmationEmailRequest request)
{
    var response = await _accountService.ResendConfirmationEmailAsync(request);
    return SendResponse(response);
}