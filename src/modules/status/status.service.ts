import { Injectable } from '@nestjs/common'

@Injectable()
export class StatusService {
  status() {
    return {
      status: 'ok',
      version: '1.0.0',
    }
  }
}
