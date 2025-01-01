import { IAccessTokenPayload } from '../../authentication/interfaces/accessToken-payload.interface';
import { Request } from 'express';

export interface RequestWithUser<T> extends Request<T> {
  user: IAccessTokenPayload;
}
