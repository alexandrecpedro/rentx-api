import {
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';

@Entity('rentals')
class Rental {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column({ type: 'varchar', nullable: true })
  car_id: string;

  @Column({ type: 'varchar', nullable: true })
  user_id: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @Column({ type: 'timestamp', nullable: false })
  expected_return_date: Date;

  @Column({ type: 'decimal', precision: 7, scale: 2, nullable: true })
  total: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Rental };
