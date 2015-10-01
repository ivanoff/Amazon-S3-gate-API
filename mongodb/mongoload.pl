#!/usr/bin/perl -w
use strict;
$| = 1;

die "Mongo capacity. Using: $0 <DataBase> <Request> <Count_per_second>" if !$ARGV[2] || $ARGV[2] !~ /^\d+$/;
my ( $db, $r, $c ) = @ARGV;

print "Running $c requests per second on $db database: $r\n";

my $cmd = "mongo $db --eval '$r' &\n" x $c;
open my $f, '>', 'mongoload.sh';
print {$f} $cmd;
close $f;
`chmod +x mongoload.sh`;

while ( 1 ) {
# 3x times slower
#    `mongo $db --eval '$r' &` for 1..$c;
    `./mongoload.sh &`;
    print "mongo $db --eval '$r'\n";
    sleep 1;
}
