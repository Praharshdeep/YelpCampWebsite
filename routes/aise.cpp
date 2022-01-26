#include<iostream>
#include<cmath>
using namespace std;

int main(){
    int n;
    cin>>n;
    int num = 0;
    int i = 0;
    int count= 0;
    while(num<n){
        num = pow(2,i);
        i++;
        count++;
    }
    cout<<count-1<<endl;
}