import {
  Table,
  Model,
  AllowNull,
  PrimaryKey,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import GroupedFindings from "./GroupedFindings";

@Table({
  tableName: "raw_findings",
  timestamps: false,
})
export default class RawFindings extends Model {
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  source_security_tool_name: string;

  @Column(DataType.STRING)
  source_security_tool_id: string;

  @Column(DataType.STRING)
  source_collbartion_tool_name: string;

  @Column(DataType.STRING)
  source_collbartion_tool_id: string;

  @Column(DataType.STRING(8))
  severity: string;

  @Column(DataType.DATE)
  finding_created: Date;

  @Column(DataType.DATE)
  ticket_created: Date;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.STRING)
  asset: string;

  @Column(DataType.STRING(11))
  status: string;

  @Column(DataType.STRING)
  remediation_url: string;

  @Column(DataType.STRING)
  remediation_text: string;

  @ForeignKey(() => GroupedFindings)
  @Column(DataType.INTEGER)
  grouped_finding_id: number;
}
