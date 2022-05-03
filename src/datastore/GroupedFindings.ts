import {
  Table,
  Model,
  AllowNull,
  PrimaryKey,
  Column,
  DataType,
} from "sequelize-typescript";

@Table({
  tableName: "grouped_findings",
  timestamps: false,
})
export default class GroupedFindings extends Model {
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING(11))
  grouping_type: string;

  @Column(DataType.STRING)
  grouping_key: string;

  @Column(DataType.STRING(8))
  severity: string;

  @Column(DataType.DATE)
  grouped_finding_created: Date;

  @Column(DataType.DATE)
  sla: Date;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.STRING)
  security_analyst: string;

  @Column(DataType.STRING)
  owner: string;

  @Column(DataType.STRING)
  workflow: string;

  @Column(DataType.STRING(11))
  status: string;

  @Column(DataType.FLOAT)
  progress: number;
}
