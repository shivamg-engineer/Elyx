import bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { User } from "../../database/modules/user/models/user.model.ts";
import { UserRegisterDto, UserLoginDto } from "../dtos/user-auth.dto.ts";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../auth.utils.ts";
import { AppDataSource } from "../../database/typeorm-cli.ts";
import type { JwtPayload } from "../auth.types.ts";

export class UserAuthService {
  private userRepo: Repository<User>;
  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }

  async register(dto: UserRegisterDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new Error("Email already exists");

    const hash = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      ...dto,
      password: hash,
    });

    await this.userRepo.save(user);
<<<<<<< HEAD
    return {
      message: "user created",
      user,
=======
    // Remove sensitive fields before returning
    const { password, ...safeUser } = user as any;
    return {
      message: "user created",
      user: safeUser,
>>>>>>> ac8ca4da (Initial commit)
    };
  }
  async login(dto: UserLoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const payload: Omit<JwtPayload, "iat" | "exp"> = {
      id: user.id,
      email: user.email,
<<<<<<< HEAD
      role: "user",
=======
      role: (user as any).role ?? "user",
>>>>>>> ac8ca4da (Initial commit)
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

<<<<<<< HEAD
    return {
      accessToken,
      refreshToken,
      user,
=======
    const { password, ...safeUser } = user as any;
    return {
      accessToken,
      refreshToken,
      user: safeUser,
>>>>>>> ac8ca4da (Initial commit)
    };
  }

  async refresh(refreshToken: string) {
    const { id, email, role } = verifyRefreshToken(refreshToken);

    const payload: Omit<JwtPayload, "iat" | "exp"> = {
      id,
      email,
      role,
    };

    return {
      accessToken: signAccessToken(payload),
    };
  }
}
