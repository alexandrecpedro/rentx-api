import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 6 })
  password: string;

  @Column({ type: 'varchar', length: 8 })
  driver_license: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isAdmin: boolean;

  @Column({ type: 'varchar' })
  avatar: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @Expose({ name: 'avatar_url' })
  avatar_url(): string {
    switch (process.env.disk) {
      case 'local':
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
