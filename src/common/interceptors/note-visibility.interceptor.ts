import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { UserRole } from '../constants';
import { Note } from '../entities';

@Injectable()
export class NoteVisibilityInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // { userId, role }

    return next.handle().pipe(
      map((data) => {
        const transformNote = (note: Note) => {
          if (!user) {
            // In case of unauthorized user (with restricted set of fields)
            return { id: note.id, title: note.title, text: note.text };
          }

          if (user.role === UserRole.SuperAdmin) {
            return note; // super admin can see all fields
          }

          // User can see his note with all fields
          if (note.author?.id === user.userId) {
            return note;
          }

          // Other users can see only the restricted set of fields
          return { id: note.id, title: note.title, text: note.text };
        };

        if (Array.isArray(data)) {
          return data.map(transformNote);
        } else {
          return transformNote(data);
        }
      }),
    );
  }
}
