/*LifE BEGINS AT THE END OF YOUR COMFORT ZONE*/

/*******************     YELLOW CARDS   ********************

#include <bits/stdc++.h>
using namespace std;
#define int long long
#define pi (3.141592653589)
#define mod 1000000007
#define int long long
#define float double
#define pb push_back
#define mp make_pair
#define ff first
#define ss second
#define all(c) c.begin(), c.end()
#define min3(a, b, c) min(c, min(a, b))
#define min4(a, b, c, d) min(d, min(c, min(a, b)))
#define rrep(i, n) for(int i=n-1;i>=0;i--)
#define rep(i,n) for(int i=0;i<n;i++)
#define fast ios_base::sync_with_stdio(false), cin.tie(nullptr), cout.tie(nullptr);


bool isPrime(int n){
    if(n==1) return false;
    if(n==2) return true;
    for(int i=2;i*i<=n;i++){
        if(n%i==0)return false;
    }
    return true;
}

void solve(){
     int a,b,c,d,n;
    cin>>a>>b>>c>>d>>n;
    if (n == (a*c + b*d))
    {
        cout<<a+b<< " " <<a+b<<endl;
        return;
    }
    int min = n - ((a*(c-1) + b*(d-1)));
    int x = (a*c + b*d);
    while(x>n){
        if(c>d && a>0){
            x=x-c;
            a--;
        }else if(d>c && b>0){
            x = x-d;
            b--;
        }
    }
    cout<<min<<" "<<a+b<<endl;
}

int32_t main(){
fast


// Fuck Ratings, I'm in Love with Experience.
// Once a Charas, Always a CHARAS.


solve();
return 0;
}*/

/***************  SHOOTING ********************************



/*LifE BEGINS AT THE END OF YOUR COMFORT ZONE*/
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define pi (3.141592653589)
#define mod 1000000007
#define int long long
#define float double
#define pb push_back
#define mp make_pair
#define ff first
#define ss second
#define all(c) c.begin(), c.end()
#define min3(a, b, c) min(c, min(a, b))
#define min4(a, b, c, d) min(d, min(c, min(a, b)))
#define rrep(i, n) for(int i=n-1;i>=0;i--)
#define rep(i,n) for(int i=0;i<n;i++)
#define fast ios_base::sync_with_stdio(false), cin.tie(nullptr), cout.tie(nullptr);


bool isPrime(int n){
    if(n==1) return false;
    if(n==2) return true;
    for(int i=2;i*i<=n;i++){
        if(n%i==0)return false;
    }
    return true;
}

int32_t main(){
fast
    int n;
    cin>>n;
    vector<pair<int,int>> v(n);
    rep(i,n){
        int x;
        cin>>x;
        v.pb({x,i+1});
    }
    sort(v.rbegin(), v.rend());
    int ans = 0;
    for(int i=0;i<n;i++){
        ans += v[i].ff*i + 1;
    }
    cout<<ans<<endl;
    for(int i=0;i<n;i++){
        cout<<v[i].ss<<" ";
    }
return 0;
}*/

