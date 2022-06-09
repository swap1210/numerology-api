import { Injectable } from '@angular/core';
import { Util } from './Util';
import { Numerology } from 'src/app/model/Numerology';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  local_data: any = {};
  // title = 'Numerology Calculator';
  set_name = '';
  $comm = new Observable<any>();
  $notif = new Observable<any>();
  $dict_data = new BehaviorSubject<Numerology[]>([]);
  constructor(private firestore: AngularFirestore) {
    this.$comm = this.firestore
      .collection<any>('comm')
      .doc('c1')
      .valueChanges();

    this.$notif = this.firestore
      .collection<any>('comm')
      .doc('notification')
      .valueChanges();

    this.$comm.subscribe((v) => {
      this.set_name = v.c_d_set;
    });
  }

  fetch = async (target: any, cur: any) => {
    let s_n_doc =
      's_n-' + Util.reduceNumber(this.calc_help(target.s_n) - cur.s_n);
    let p_n_doc =
      'p_n-' + Util.reduceNumber(this.calc_help(target.p_n) - cur.p_n);
    let d_n_doc =
      'd_n-' + Util.reduceNumber(this.calc_help(target.d_n) - cur.d_n);

    //#Business logic
    console.log(
      target,
      'target ' + target.s_n,
      'cur ' + cur.s_n,
      'need ' + this.calc_help(target.s_n),
      s_n_doc,
      p_n_doc,
      d_n_doc
    );

    let self = this;
    Promise.all([
      this.firestore.collection<any>('dictionary').doc(s_n_doc).get(),
      this.firestore.collection<any>('dictionary').doc(p_n_doc).get(),
      this.firestore.collection<any>('dictionary').doc(d_n_doc).get(),
    ]).then((val) => {
      //all promise completed and subscribed
      val[0].subscribe((s_n_v) => {
        // console.log(Object.keys(s_n_v.data()).length, s_n_v.data());
        let temp: Numerology[] = [];
        Object.keys(s_n_v.data()).forEach((v) => {
          let word =
            target.prefix +
            ' ' +
            v.charAt(0).toUpperCase() +
            v.slice(1) +
            ' ' +
            target.suffix;
          if (
            target.p_n == Util.Personality(word) &&
            target.d_n == Util.Destiny(word)
          ) {
            temp.push({
              name: word,
              c_n: Util.Compound(word),
              s_n: target.s_n,
              p_n: target.p_n,
              d_n: target.d_n,
              d_nm: 'coming soon',
              r_n: 0,
              l_n: 0,
            });
          }
        });
        self.$dict_data.next(temp);
      });

      val[1].subscribe((p_n_v) => {
        // console.log(Object.keys(p_n_v.data()).length, p_n_v.data());
        let temp: Numerology[] = [];
        Object.keys(p_n_v.data()).forEach((v) => {
          let word = target.prefix + ' ' + v + ' ' + target.suffix;
          if (
            target.s_n == Util.SoulUrge(word) &&
            target.d_n == Util.Destiny(word)
          ) {
            temp.push({
              name: word,
              c_n: Util.Compound(word),
              s_n: target.s_n,
              p_n: target.p_n,
              d_n: target.d_n,
              d_nm: 'coming soon',
              r_n: 0,
              l_n: 0,
            });
          }
        });
        self.$dict_data.next(temp);
      });

      val[2].subscribe((d_n_v) => {
        // console.log(Object.keys(d_n_v.data()).length, d_n_v.data());
        let temp: Numerology[] = [];
        Object.keys(d_n_v.data()).forEach((v) => {
          let word = target.prefix + ' ' + v + ' ' + target.suffix;
          if (
            target.s_n == Util.SoulUrge(word) &&
            target.p_n == Util.Personality(word)
          ) {
            temp.push({
              name: word,
              c_n: Util.Compound(word),
              s_n: target.s_n,
              p_n: target.p_n,
              d_n: target.d_n,
              d_nm: 'coming soon',
              r_n: 0,
              l_n: 0,
            });
          }
        });
        self.$dict_data.next(temp);
      });
    });
  };

  calc_help = (num: number): number => {
    return 10 + (num - 1);
  };

  calculateNums = (name1: string): Numerology => {
    return {
      s_n: Util.SoulUrge(name1),
      d_n: Util.Destiny(name1),
      p_n: Util.Personality(name1),
      c_n: Util.Compound(name1),
      name: name1,
      r_n: 0,
      l_n: 0,
    };
  };
  calculateNums2 = (name1: string, dob: Date): Numerology => {
    return {
      s_n: Util.SoulUrge(name1),
      d_n: Util.Destiny(name1),
      p_n: Util.Personality(name1),
      c_n: Util.Compound(name1),
      name: name1,
      r_n: Util.ruling(dob),
      l_n: Util.lucky(dob),
    };
  };

  load_dictionary = (p_txt: string) => {
    p_txt.split('\n').forEach((v: any) => {
      if (v && v.match(/^[A-Za-z\s]+$/)) {
        let temp_calc = this.calculateNums(v);
        let temp_name = JSON.parse('{"' + v + '":false}');
        this.local_data['s_n-' + temp_calc.s_n] = {
          ...this.local_data['s_n-' + temp_calc.s_n],
          ...temp_name,
        };
        this.local_data['p_n-' + temp_calc.p_n] = {
          ...this.local_data['p_n-' + temp_calc.p_n],
          ...temp_name,
        };
        this.local_data['d_n-' + temp_calc.d_n] = {
          ...this.local_data['d_n-' + temp_calc.d_n],
          ...temp_name,
        };
      }
    });
  };

  upload_to_cloud = () => {
    let self = this;
    let temp_load = new BehaviorSubject<any>({});
    let total = Object.keys(this.local_data).length;
    let done = 0;
    Object.keys(this.local_data).forEach((k) => {
      // console.log(k, self.local_data[k as keyof typeof self.local_data]);
      done++;
      this.firestore
        .collection('dictionary')
        .doc(k)
        .update(self.local_data[k as keyof typeof self.local_data])
        .then(() => {
          console.log('Upload Complete ' + (done / total) * 100.0);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  logged(dat: any) {
    let a = Timestamp.now();
    dat = {
      ...dat,
      on: a,
    };
    let t: any = {};
    t[(a.seconds + '') as keyof typeof t] = dat;
    this.firestore.collection('c_d').doc(this.set_name).update(t);
  }
}
