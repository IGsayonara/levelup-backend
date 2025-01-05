import { IAccessTokenPayload } from '../../authentication/interfaces/accessToken-payload.interface';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: IAccessTokenPayload;
}
