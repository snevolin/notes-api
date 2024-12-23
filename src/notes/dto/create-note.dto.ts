import { IsString, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  extraInfo?: string;
}
