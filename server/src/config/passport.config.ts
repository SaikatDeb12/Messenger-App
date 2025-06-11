import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { IUser } from "../models/user.model";
import Account from "../models/account.model";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: "/auth/github/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      try {
        let account = await Account.findOne({
          provider: "github",
          providerAccountId: profile.id,
        });
        let user: IUser | null;

        if (account) {
          user = await User.findById(account.userId);
          if (!user) return done(null, false, { message: "User not found" });
        } else {
          user = await User.findOne({ email: profile.emails[0].value });
          if (!user) {
            user = new User({
              email: profile.emails[0].value,
              name: profile.displayName,
              image: profile.photos[0].value,
            });
            await user.save();
          }

          account = new Account({
            userId: user._id,
            provider: "github",
            providerAccountId: profile.id,
            access_token: accessToken,
            type: "oauth",
          });
          await account.save();

          user.accounts.push(account.id);
          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//       callbackURL: "/auth/google/callback",
//     },
//     async (
//       accessToken: string,
//       refreshToken: string,
//       profile: any,
//       done: any
//     ) => {
//       try {
//         let account = await Account.findOne({
//           provider: "google",
//           providerAccountId: profile.id,
//         });
//         let user: IUser | null;

//         if (account) {
//           user = await User.findById(account.userId);
//           if (!user) return done(null, false, { message: "User not found" });
//         } else {
//           user = await User.findOne({ email: profile.emails[0].value });
//           if (!user) {
//             user = new User({
//               email: profile.emails[0].value,
//               name: profile.displayName,
//               image: profile.photos[0].value,
//             });
//             await user.save();
//           }

//           account = new Account({
//             userId: user._id,
//             provider: "google",
//             providerAccountId: profile.id,
//             access_token: accessToken,
//             type: "oauth",
//           });
//           await account.save();

//           user.accounts.push(account.id);
//           await user.save();
//         }

//         done(null, user);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await User.findById(id);
  done(null, user);
});
