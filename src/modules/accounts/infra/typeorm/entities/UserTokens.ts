import {
  CreateDateColumn,
  Column,
  PrimaryColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from './User';

@Entity('users_tokens')
class UserTokens {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  refresh_token: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', nullable: true })
  user_id: string;

  @Column({ type: 'timestamp' })
  expires_date: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { UserTokens };
