import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryColumn,
  ManyToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Category } from './Category';
import { Specification } from './Specification';

@Entity('cars')
class Car {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  daily_rate: number;

  @Column({ type: 'varchar', nullable: false, default: true })
  available: boolean;

  @Column({ type: 'varchar', length: 8 })
  license_plate: string;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  fine_amount: number;

  @Column({ type: 'varchar', nullable: false })
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'varchar', nullable: true })
  category_id: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: Specification[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.available = true;
    }
  }
}

export { Car };
