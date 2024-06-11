import { Prisma, PrismaClient } from '@prisma/client';

class StoredProcedureRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(
    procedureName: string,
    parameters?: Record<string, any>,
  ): Promise<any[]> {
    try {
      if (!this.isValidProcedureName(procedureName)) {
        throw new Error(`Invalid procedure name: ${procedureName}`);
      }

      const paramPlaceholders = parameters
        ? Object.keys(parameters).map((key) => `${key} = ?`)
        : [];
      const query = parameters
        ? Prisma.sql`CALL ${Prisma.raw(procedureName)}(${Prisma.join(paramPlaceholders, ', ')})`
        : Prisma.sql`CALL ${Prisma.raw(procedureName)}`;

      const result = await this.prisma.$queryRaw<any[]>(
        query,
        ...(parameters ? Object.values(parameters) : []),
      );
      return result;
    } catch (error) {
      console.error(
        `Error executing stored procedure ${procedureName}:`,
        error,
      );
      throw new Error(
        `Failed to execute stored procedure ${procedureName}: ${error.message}`,
      );
    }
  }

  private isValidProcedureName(procedureName: string): boolean {
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(procedureName);
  }
}

export default StoredProcedureRepository;
