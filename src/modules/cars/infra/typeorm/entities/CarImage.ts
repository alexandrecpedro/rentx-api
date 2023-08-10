import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('cars_image')
class CarImage {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', nullable: true })
  car_id: string;

  @Column({ type: 'varchar', nullable: false })
  image_name: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { CarImage };
