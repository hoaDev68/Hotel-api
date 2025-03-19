import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ChiTietDatPhong } from 'src/booking-detail/booking-detail.entity';

@Entity()
export class Phong {
  @PrimaryGeneratedColumn('uuid')
  maPhong: string;

  @Column()
  soPhong: number;

  @Column()
  kieuPhong: string;

  @Column('double precision')
  giaPhong: number;

  @Column({
    type: 'enum',
    enum: ['TRONG', 'DANG_SU_DUNG', 'DA_DAT'], // Enum trạng thái phòng
    default: 'TRONG',
  })
  tinhTrang: string;

  @OneToMany(() => ChiTietDatPhong, (chiTietDatPhong) => chiTietDatPhong.phong)
  chiTietDatPhongs: ChiTietDatPhong[];

  // Hàm hỗ trợ
  tinhGiaPhong(): number {
    return this.giaPhong;
  }
}
