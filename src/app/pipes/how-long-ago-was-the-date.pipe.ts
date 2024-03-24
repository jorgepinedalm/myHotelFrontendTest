import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'howLongAgoWasTheDate'
})
export class HowLongAgoWasTheDatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    return this.getDiffDays(value);
  }

  private getDiffDays(date:Date):string{
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const diffMs = date.getTime() - currentDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Tomorrow';
    } else if (diffDays === -1) {
      return 'Yesterday';
    } else if (diffDays > 1) {
        return `In ${diffDays} days`;
    } else {
        return `${-diffDays} days ago`;
    }
  }

}
