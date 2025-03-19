// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   handleRequest(err, user, info: Error) {
//     if (!user) {
//       console.log(info.message);
//       throw new UnauthorizedException(info.message);
//     }
//     return user;
//   }
// }
